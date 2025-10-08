import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import makeConsultant from '@/api/useConsultant';
import MyModal from '@/components/MyModal';
import useConsult from '@/hooks/useConsult';
import useConsultants from '@/hooks/useConsultants';
import Swal from 'sweetalert2';

type GroupSelectionModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  groupData: Api.GroupData[];
  currentGroup: Api.GroupData;
  onSelectGroup: (group: Api.GroupData) => void;
};

function GroupSelectionModal({
  isOpen,
  setIsOpen,
  groupData = [],
  currentGroup,
  onSelectGroup,
}: GroupSelectionModalProps) {
  const [selectedGroupId, setSelectedGroupId] = useState(
    currentGroup?.id || '',
  );
  const { t } = useTranslation();
  const navigate = useNavigate();
  const addConsultantAsync = makeConsultant();
  const handleConsultants = useConsultants();
  const { activeConsultant } = useConsult();
  const hasGroupData = groupData.length > 0;
  if (!activeConsultant) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasGroupData) {
      // Redirigir a la página de creación de grupos
      navigate('/group/group_pinnacle');
      setIsOpen(false);
      return;
    }

    const selectedGroup = groupData.find((g) => g.id === selectedGroupId);

    if (selectedGroup) {
      const newConsultant: Api.Consultant = {
        ...activeConsultant,
        guestEnergy: {
          ...activeConsultant?.guestEnergy,
          guestGroup: selectedGroup,
        },
      };
      const consultantToEdit = handleConsultants.updateConsultant(activeConsultant.id, newConsultant);
      addConsultantAsync.mutateAsync(consultantToEdit).then(() => {
        Swal.fire({
          title: '¡Guardado exitosamente!',
          text: 'El grupo ha sido guardado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        onSelectGroup(selectedGroup);
        setIsOpen(false);
      }).catch((err) => {
        Swal.fire({
          title: 'Error',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }).finally(() => {
        Swal.fire({
          title: 'Guardando...',
          text: 'Por favor espera mientras se guarda el grupo.',
          icon: 'info',
          confirmButtonText: 'Aceptar',
        });
      });
    }
  };

  const handleCreateGroup = () => {
    navigate('/group/group_pinnacle');
    setIsOpen(false);
  };

  return (
    <MyModal
      size="small"
      title={
        hasGroupData
          ? (t('modal.group.selectTitle') as string)
          : (t('modal.group.noGroupsTitle') as string)
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isLoading={false}
    >
      {hasGroupData ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="group-select">
              {t('modal.group.selectLabel')}
            </label>
            <select
              id="group-select"
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
              className="w-full border border-gray-500 p-2 rounded-md"
              required
            >
              <option value="">
                {t('modal.group.selectPlaceholder')}
              </option>
              {groupData.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                  {' '}
                  (
                  {group.members?.length || 0}
                  {' '}
                  miembros)
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="btn btn-cancel"
            >
              {t('modal.group.cancel')}
            </button>
            <button
              type="submit"
              disabled={!selectedGroupId}
              className="btn"
            >
              {t('modal.group.save')}
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              {t('modal.group.noGroupsMessage')}
            </p>
            <div className="text-6xl mb-4">👥</div>
            <p className="text-sm text-gray-500">
              {t('modal.group.noGroupsSubMessage')}
            </p>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="btn btn-cancel"
            >
              {t('modal.group.cancel')}
            </button>
            <button
              type="button"
              onClick={handleCreateGroup}
              className="btn"
            >
              {t('modal.group.createGroup')}
            </button>
          </div>
        </div>
      )}
    </MyModal>
  );
}

export default GroupSelectionModal;

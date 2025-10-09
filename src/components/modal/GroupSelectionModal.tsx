import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import makeConsultant from '@/api/useConsultant';
import MyModal from '@/components/MyModal';
import useConsult from '@/hooks/useConsult';
import useConsultants from '@/hooks/useConsultants';
import Swal from 'sweetalert2';

type GroupSelectionModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  nameProps: string;
  guestYearProps: number;
};
interface GroupMemberProps {
  id: number;
  name: string;
  date: string;
}

function GroupSelectionModal({
  isOpen,
  setIsOpen,
  nameProps,
  guestYearProps,
}: GroupSelectionModalProps) {
  const { t } = useTranslation();

  const addConsultantAsync = makeConsultant();
  const handleConsultants = useConsultants();
  const {
    activeConsultant, guestGroup, selectActiveGuestGroup,
  } = useConsult();

  // Estado optimizado: un solo array en lugar de 8 estados separados
  const [groupMembers, setGroupMembers] = useState<GroupMemberProps[]>(
    () => Array.from({ length: 8 }, (_, index) => ({
      id: index + 1,
      name: guestGroup?.[index]?.name || '',
      date: guestGroup?.[index]?.date || '',
    })),
  );

  const [name, setName] = useState<string>(nameProps || '');
  const [guestYear, setGuestYear] = useState<number>(guestYearProps || 0);

  // Función genérica para actualizar cualquier miembro del grupo
  const updateGroupMember = (
    index: number,
    field: 'name' | 'date',
    value: string,
  ) => {
    setGroupMembers((prev) => prev.map((member, i) => (i === index ? { ...member, [field]: value } : member)));
  };

  if (!activeConsultant) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validGroupMembers: Api.GroupMember[] = groupMembers
      .filter((member) => member.name !== '' && member.date !== '')
      .map((member) => ({
        id: Math.random().toString(36).substring(2, 9),
        name: member.name,
        lastName: '',
        scdLastName: '',
        date: member.date,
        dateInit: guestYear,
      }));

    if (validGroupMembers.length === 0) {
      setIsOpen(false);
      return;
    }

    const newConsultant: Api.Consultant = {
      ...activeConsultant,
      guestEnergyGroup: {
        guestGroup: validGroupMembers,
        name,
        guestYearGroup: guestYear,
      },
    };
    const consultantToEdit = handleConsultants.updateConsultant(activeConsultant.id, newConsultant);
    addConsultantAsync.mutateAsync(consultantToEdit).then(() => {
      selectActiveGuestGroup(validGroupMembers, guestYear);
      Swal.fire({
        title: '¡Guardado exitosamente!',
        text: 'El grupo ha sido guardado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
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
  };

  return (
    <MyModal
      size="large"
      title="Grupo Invitado"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isLoading={false}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-1">
        <div className="flex w-full gap-1">
          <div className="form-group gap-1 w-1/2">
            <p>
              Nombre del grupo
            </p>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-500 p-2 rounded-md"
                placeholder={t('forms.name') as string}
              />
            </div>
          </div>
          <div className="form-group gap-1 w-1/2">
            <p>
              Última fecha deintegración
            </p>
            <input
              type="number"
              name="guestYear"
              value={guestYear}
              onChange={(e) => setGuestYear(Number(e.target.value))}
              className="w-full border border-gray-500 p-2 rounded-md"
            />
          </div>
        </div>

        <div className="flex gap-1 w-full justify-center">
          {/* Columna izquierda: integrantes impares (1, 3, 5, 7) */}
          <div className="flex flex-col gap-3 w-1/2">
            {[0, 2, 4, 6].map((index) => (
              <div key={groupMembers[index].id} className="form-group gap-1">
                <p>
                  Integrante
                  {' '}
                  {index + 1}
                </p>
                <input
                  type="text"
                  name="name"
                  value={groupMembers[index].name}
                  onChange={(e) => updateGroupMember(index, 'name', e.target.value)}
                  className="w-full border border-gray-500 p-2 rounded-md"
                  placeholder={t('forms.name') as string}
                />
                <input
                  type="date"
                  name="date"
                  value={groupMembers[index].date}
                  onChange={(e) => updateGroupMember(index, 'date', e.target.value)}
                  className="w-full border border-gray-500 p-2 rounded-md"
                />
              </div>
            ))}
          </div>
          {/* Columna derecha: integrantes pares (2, 4, 6, 8) */}
          <div className="flex flex-col gap-3 w-1/2">
            {[1, 3, 5, 7].map((index) => (
              <div key={groupMembers[index].id} className="form-group gap-1">
                <p>
                  Integrante
                  {' '}
                  {index + 1}
                </p>
                <input
                  type="text"
                  name="name"
                  value={groupMembers[index].name}
                  onChange={(e) => updateGroupMember(index, 'name', e.target.value)}
                  className="w-full border border-gray-500 p-2 rounded-md"
                  placeholder={t('forms.name') as string}
                />
                <input
                  type="date"
                  name="date"
                  value={groupMembers[index].date}
                  onChange={(e) => updateGroupMember(index, 'date', e.target.value)}
                  className="w-full border border-gray-500 p-2 rounded-md"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-1 justify-end">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="btn btn-cancel"
          >
            {t('modal.group.cancel')}
          </button>
          <button
            type="submit"
            className="btn"
          >
            {t('modal.group.save')}
          </button>
        </div>
      </form>
    </MyModal>
  );
}

export default GroupSelectionModal;

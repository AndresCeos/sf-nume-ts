import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import makeConsultant from '@/api/useConsultant';
import MyModal from '@/components/MyModal';
import useConsult from '@/hooks/useConsult';
import useConsultants from '@/hooks/useConsultants';
import Swal from 'sweetalert2';

type PartnerSelectionModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  partnerData: Api.PartnerData[];
  currentPartner: Api.PartnerData;
  onSelectPartner: (partner: Api.PartnerData) => void;
};

function PartnerSelectionModal({
  isOpen,
  setIsOpen,
  partnerData = [],
  currentPartner,
  onSelectPartner,
}: PartnerSelectionModalProps) {
  const [selectedPartnerId, setSelectedPartnerId] = useState(
    currentPartner?.id || '',
  );
  const { t } = useTranslation();
  const navigate = useNavigate();
  const addConsultantAsync = makeConsultant();
  const handleConsultants = useConsultants();
  const { activeConsultant } = useConsult();
  const hasPartnerData = partnerData.length > 0;
  if (!activeConsultant) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasPartnerData) {
      // Redirigir a la página de creación de parejas
      navigate('/partner/synastry_pinnacle');
      setIsOpen(false);
      return;
    }

    const selectedPartner = partnerData.find((p) => p.id === selectedPartnerId);

    if (selectedPartner) {
      const newConsultant: Api.Consultant = {
        ...activeConsultant,
        guestEnergy: {
          ...activeConsultant?.guestEnergy,
          guestPartner: selectedPartner,
        },
      };
      const consultantToEdit = handleConsultants.updateConsultant(activeConsultant.id, newConsultant);
      addConsultantAsync.mutateAsync(consultantToEdit).then(() => {
        Swal.fire({
          title: '¡Guardado exitosamente!',
          text: 'La pareja ha sido guardada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        onSelectPartner(selectedPartner);
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
          text: 'Por favor espera mientras se guarda la pareja.',
          icon: 'info',
          confirmButtonText: 'Aceptar',
        });
      });
    }
  };

  const handleCreatePartner = () => {
    navigate('/partner/synastry_pinnacle');
    setIsOpen(false);
  };

  return (
    <MyModal
      size="small"
      title={
        hasPartnerData
          ? (t('modal.partner.selectTitle') as string)
          : (t('modal.partner.noPartnersTitle') as string)
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isLoading={false}
    >
      {hasPartnerData ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="partner-select">
              {t('modal.partner.selectLabel')}
            </label>
            <select
              id="partner-select"
              value={selectedPartnerId}
              onChange={(e) => setSelectedPartnerId(e.target.value)}
              className="w-full border border-gray-500 p-2 rounded-md"
              required
            >
              <option value="">
                {t('modal.partner.selectPlaceholder')}
              </option>
              {partnerData.map((partner) => (
                <option key={partner.id} value={partner.id}>
                  {partner.name}
                  {' '}
                  (
                  {partner.yearMeet}
                  )
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
              {t('modal.partner.cancel')}
            </button>
            <button
              type="submit"
              disabled={!selectedPartnerId}
              className="btn"
            >
              {t('modal.partner.save')}
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              {t('modal.partner.noPartnersMessage')}
            </p>
            <div className="text-6xl mb-4">💕</div>
            <p className="text-sm text-gray-500">
              {t('modal.partner.noPartnersSubMessage')}
            </p>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="btn btn-cancel"
            >
              {t('modal.partner.cancel')}
            </button>
            <button
              type="button"
              onClick={handleCreatePartner}
              className="btn"
            >
              {t('modal.partner.createPartner')}
            </button>
          </div>
        </div>
      )}
    </MyModal>
  );
}

export default PartnerSelectionModal;

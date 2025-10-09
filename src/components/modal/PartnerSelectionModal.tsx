import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import makeConsultant from '@/api/useConsultant';
import MyModal from '@/components/MyModal';
import useConsult from '@/hooks/useConsult';
import useConsultants from '@/hooks/useConsultants';
import { isValidDate } from '@/utils/constants';
import Swal from 'sweetalert2';

type PartnerSelectionModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  yearMeetProps: number;
  nameProps: string;
};

function PartnerSelectionModal({
  isOpen,
  setIsOpen,
  yearMeetProps,
  nameProps,
}: PartnerSelectionModalProps) {
  const {
    guestPartner, selectActiveGuestPartner, activeConsultant,
  } = useConsult();
  const [partnerOne, setPartnerOne] = useState({
    name: guestPartner?.[0]?.names || '',
    birthDate: guestPartner?.[0]?.date || '',
  });
  const [partnerTwo, setPartnerTwo] = useState({
    name: guestPartner?.[1]?.names || '',
    birthDate: guestPartner?.[1]?.date || '',
  });
  const [yearMeet, setYearMeet] = useState(yearMeetProps || 0);
  const [name, setName] = useState(nameProps || '');
  const { t } = useTranslation();

  const addConsultantAsync = makeConsultant();
  const handleConsultants = useConsultants();
  if (!activeConsultant) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidDate(partnerOne.birthDate) || !isValidDate(partnerTwo.birthDate)) {
      return;
    }

    const partnerOneTemp: Api.Partner = {
      id: Math.random().toString(36).substring(2, 9) || '',
      names: partnerOne.name || '',
      lastName: '',
      scdLastName: '',
      date: partnerOne.birthDate || '',
    };
    const partnerTwoTemp: Api.Partner = {
      id: Math.random().toString(36).substring(2, 9) || '',
      names: partnerTwo.name || '',
      lastName: '',
      scdLastName: '',
      date: partnerTwo.birthDate || '',
    };

    const newConsultant: Api.Consultant = {
      ...activeConsultant,
      guestEnergyPartner: {
        guestPartner: [partnerOneTemp, partnerTwoTemp],
        guestMeetYear: yearMeet,
        name,
      },
    };

    const consultantToEdit = handleConsultants.updateConsultant(activeConsultant?.id || '', newConsultant);
    addConsultantAsync.mutateAsync(consultantToEdit).then(() => {
      selectActiveGuestPartner([partnerOneTemp, partnerTwoTemp], yearMeet);
      Swal.fire({
        title: '¡Guardado exitosamente!',
        text: 'La pareja ha sido guardada correctamente.',
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
        text: 'Por favor espera mientras se guarda la pareja.',
        icon: 'info',
        confirmButtonText: 'Aceptar',
      });
    });
  };

  return (
    <MyModal
      size="small"
      title="Pareja Invitado"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isLoading={false}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="form-group gap-2">
            <p>{t('modal.partner.name')}</p>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-500 p-2 rounded-md"
            />
          </div>
          <div className="form-group gap-2">
            <p>{t('modal.partner.partnerOne')}</p>
            <input
              type="text"
              name="partnerOne"
              value={partnerOne.name}
              placeholder={t('forms.name') as string}
              onChange={(e) => setPartnerOne({ ...partnerOne, name: e.target.value })}
              className="w-full border border-gray-500 p-2 rounded-md"
            />
            <input
              type="date"
              name="partnerOneBirthDate"
              value={partnerOne.birthDate}
              onChange={(e) => setPartnerOne({ ...partnerOne, birthDate: e.target.value })}
              className="w-full border border-gray-500 p-2 rounded-md"
            />
          </div>
          <div className="form-group gap-2">
            <p>{t('modal.partner.partnerTwo')}</p>
            <input
              type="text"
              name="partnerTwo"
              value={partnerTwo.name}
              placeholder={t('forms.name') as string}
              onChange={(e) => setPartnerTwo({ ...partnerTwo, name: e.target.value })}
              className="w-full border border-gray-500 p-2 rounded-md"
            />
            <input
              type="date"
              name="partnerTwoBirthDate"
              value={partnerTwo.birthDate}
              onChange={(e) => setPartnerTwo({ ...partnerTwo, birthDate: e.target.value })}
              className="w-full border border-gray-500 p-2 rounded-md"
            />
          </div>
          <div className="form-group gap-2">
            <p>{t('modal.partner.yearMeet')}</p>
            <input
              type="number"
              name="yearMeet"
              value={yearMeet}
              onChange={(e) => setYearMeet(Number(e.target.value))}
              className="w-full border border-gray-500 p-2 rounded-md"
            />
          </div>
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
            className="btn"
          >
            {t('modal.partner.save')}
          </button>
        </div>
      </form>
    </MyModal>
  );
}

export default PartnerSelectionModal;

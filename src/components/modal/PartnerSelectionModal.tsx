import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import makeGuestEnergy from '@/api/useGuestEnergy';
import MyModal from '@/components/MyModal';
import useEnergy from '@/hooks/useEnergy';
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
  const { guestPartner, selectActiveGuestPartner } = useEnergy();
  const updateGuestEnergy = makeGuestEnergy();
  const [partnerOne, setPartnerOne] = useState({
    name: guestPartner?.guestPartner?.[0]?.names || '',
    birthDate: guestPartner?.guestPartner?.[0]?.date || '',
  });
  const [partnerTwo, setPartnerTwo] = useState({
    name: guestPartner?.guestPartner?.[1]?.names || '',
    birthDate: guestPartner?.guestPartner?.[1]?.date || '',
  });
  const [yearMeet, setYearMeet] = useState(yearMeetProps || 0);
  const [name, setName] = useState(nameProps || '');
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidDate(partnerOne.birthDate) || !isValidDate(partnerTwo.birthDate)) {
      return;
    }

    // Mostrar loading ANTES de la operación
    Swal.fire({
      title: t('modal.partner.saving') as string,
      text: t('modal.partner.pleaseWait') as string,
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

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

    const guestEnergyPartner: Api.GuestEnergyPartner = {
      guestPartner: [partnerOneTemp, partnerTwoTemp],
      guestMeetYear: yearMeet,
      name,
    };

    try {
      await updateGuestEnergy.mutateAsync(guestEnergyPartner);
      selectActiveGuestPartner({ guestPartner: [partnerOneTemp, partnerTwoTemp], guestMeetYear: yearMeet, name });

      await Swal.fire({
        title: t('modal.partner.successSave') as string,
        text: t('modal.partner.successSaveMessage') as string,
        icon: 'success',
        confirmButtonText: t('modal.partner.accept') as string,
      });

      setIsOpen(false);
    } catch (err) {
      Swal.fire({
        title: t('modal.partner.errorSave') as string,
        text: err instanceof Error ? err.message : t('modal.partner.unknownError') as string,
        icon: 'error',
        confirmButtonText: t('modal.partner.accept') as string,
      });
    }
  };

  return (
    <MyModal
      size="small"
      title={t('modal.partner.guestPartner') as string}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isLoading={false}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="form-group gap-2">
            <p>{t('modal.partner.namePartner')}</p>
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

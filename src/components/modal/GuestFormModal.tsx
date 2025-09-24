import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import MyModal from '@/components/MyModal';
import { EnergyConsultant } from '@/context/EnergyContext';
import useForm from '@/hooks/useForm';

type GuestFormModalProps = {
  guest?: EnergyConsultant;
  callback: (consultant: Partial<EnergyConsultant>) => void;
  children: React.ReactNode;
};

function GuestFormModal({ guest, callback, children }: GuestFormModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const { t } = useTranslation();

  const initialForm = {
    name: guest?.name || '',
    date: guest?.date || '',
  };

  const {
    name, date, handleInputChange,
  } = useForm(initialForm);

  const openModal = () => setIsOpen(true);

  const getInputDateValue = (value: string) => {
    // If empty, return empty string to avoid invalid time
    if (!value) return '';
    // If already in yyyy-MM-dd, keep it
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    // Try to parse
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return '';
    try {
      return format(parsed, 'yyyy-MM-dd');
    } catch {
      return '';
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    // Convert to ISO date string format (YYYY-MM-DD) for calculations
    const isoDate = new Date(date).toISOString().split('T')[0];
    callback({ ...guest?.id && { id: guest.id }, name, date: isoDate });
    setIsOpen(false);
  };

  const validateForm = () => {
    if (name === '' || date === '') {
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);
  };

  useEffect(() => {
    validateForm();
  }, [name, date]);

  return (
    <>
      <button onClick={openModal} type="button">
        {children}
      </button>
      <MyModal
        size="small"
        title={t('modal.guest.title') as string}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isLoading={false}
      >
        <form className="flex flex-col gap-2" onSubmit={handleOnSubmit}>
          <label htmlFor="name">
            {t('modal.guest.name')}
            <input
              type="text"
              className="w-full border border-gray-500 p-1 rounded-md"
              id="name"
              name="name"
              value={name}
              onChange={(e) => handleInputChange(e.target)}
            />
          </label>
          <label htmlFor="date">
            {t('modal.guest.birthDate')}
            <input
              type="date"
              className="w-full border border-gray-500 p-1 rounded-md"
              id="date"
              name="date"
              value={getInputDateValue(date)}
              onChange={(e) => handleInputChange(e.target)}
            />
          </label>
          <div className="grid place-items-center mt-3">
            <button className="btn" type="submit" disabled={!isFormValid}>
              {t('modal.guest.save')}
            </button>
          </div>
        </form>
      </MyModal>
    </>
  );
}

GuestFormModal.defaultProps = {
  guest: undefined,
};

export default GuestFormModal;

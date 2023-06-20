import moment from 'moment';
import { useEffect, useState } from 'react';

import MyModal from '@/components/MyModal';
import { Consultant } from '@/context/EnergyContext';
import useForm from '@/hooks/useForm';

type GuestFormModalProps = {
  guest?: Consultant;
  callback: (consultant: Partial<Consultant>) => void;
  children: React.ReactNode;
};

function GuestFormModal({ guest, callback, children }: GuestFormModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

  const initialForm = {
    name: guest?.name || '',
    date: guest?.date || '',
  };

  const {
    name, date, handleInputChange,
  } = useForm(initialForm);

  const openModal = () => setIsOpen(true);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    callback({ ...guest?.id && { id: guest.id }, name, date: new Date(date).toDateString() });
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
        title="Energ&iacute;a personal"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isLoading={false}
      >
        <form className="flex flex-col gap-2" onSubmit={handleOnSubmit}>
          <label htmlFor="name">
            Nombre
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
            Fecha de Nacimiento
            <input
              type="date"
              className="w-full border border-gray-500 p-1 rounded-md"
              id="date"
              name="date"
              value={moment(date).format('YYYY-MM-DD')}
              onChange={(e) => handleInputChange(e.target)}
            />
          </label>
          <div className="grid place-items-center mt-3">
            <button className="btn" type="submit" disabled={!isFormValid}>Guardar</button>
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

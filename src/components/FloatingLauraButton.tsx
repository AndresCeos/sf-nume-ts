import miniLaura from '@/assets/mini-laura.png';
import { useState } from 'react';
import FloatingLaura from './FloatingLaura';

export default function FloatingLauraButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="floating-laura-button"
        title="Glosario de Numerología"
      >
        <img
          src={miniLaura}
          alt="Laura - Glosario"
          className="w-full h-full object-cover rounded-full"
        />
      </button>

      <FloatingLaura
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

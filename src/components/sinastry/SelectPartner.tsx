import { useContext, useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { TiPlus } from 'react-icons/ti';

import { ConsultContext } from '@/context/ConsultContext';
import PartnerFormInLine from './PartnerFormInLine';

export default function SelectPartner() {
  const {
    partnerDataAvailable, activePartnerData, consultant, isEditingConsultant, handleIsEditingConsultant,
  } = useContext(ConsultContext);
  const [partnerEmpty, setPartnerEmpty] = useState(true);
  const [isAddFormActive, setIsAddFormActive] = useState(false);

  useEffect(() => {
    // Cambiar la lógica para usar partnerDataAvailable en lugar de partnersAvailable
    // Agregar verificación de seguridad para evitar errores de undefined
    const partnerDataArray = partnerDataAvailable || [];
    if (partnerDataArray.length === 0) {
      setPartnerEmpty(true);
    } else {
      setPartnerEmpty(false);
    }
  }, [partnerDataAvailable]);

  if (!consultant) return null;

  const handleEditPartner = () => {
    handleIsEditingConsultant(!isEditingConsultant);
  };

  // Verificar si el grupo activo ya tiene 2 parejas
  const activeGroupHasMaxPartners = activePartnerData && activePartnerData.partner && activePartnerData.partner.length >= 2;

  return (
    <div className="grid mt-8 mx-14 col-span-12 mb-10 ">
      <div className="bg-black text-white text-base font-bold h-8 flex items-center justify-between rounded-tl-2xl rounded-tr-2xl">
        <div className="flex items-center">
          <div
            className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-red-day p-2"
          >
            <TiPlus className="text-2xl" />
          </div>
          Datos de Pareja
          <MdEdit className="text-xl text-white" />
        </div>
        {(partnerDataAvailable || []).length > 0 && !activeGroupHasMaxPartners ? (
          <button
            type="button"
            onClick={() => setIsAddFormActive(!isAddFormActive)}
            className={`float-right ${
              isAddFormActive ? 'bg-red-500' : 'bg-gold'
            } px-4 font-bold h-11 mb-3 rounded-t-3xl rounded-bl-3xl ${
              isEditingConsultant ? 'hidden' : ''
            }`}
          >
            {isAddFormActive
              ? 'Cancelar'
              : 'Crear Grupo de Pareja'}
          </button>
        ) : null}
      </div>
      <div className="pinnacle-wrap px-8 py-8">
        <PartnerFormInLine
          hasPartner={partnerEmpty}
          setIsAddFormActive={setIsAddFormActive}
          handleEditPartner={handleEditPartner}
          isAddFormActive={isAddFormActive}
        />
      </div>
    </div>
  );
}

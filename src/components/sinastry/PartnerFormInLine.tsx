import { useContext, useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';

import { ConsultContext } from '@/context/ConsultContext';
import Person from '@/resources/Person';
import add_user_main from '../../assets/icons/add_user_main.svg';
import c_delete from '../../assets/icons/c_delete.svg';
import PartnerForm from './PartnerForm';

type PartnerFormInLineProps = {
  hasPartner: boolean;
  setIsAddFormActive: (isAddFormActive: boolean) => void;
  handleEditPartner: () => void;
  isAddFormActive: boolean;
};

export default function PartnerFormInLine({
  hasPartner,
  setIsAddFormActive,
  handleEditPartner,
  isAddFormActive,
}: PartnerFormInLineProps) {
  const {
    partnersAvailable,
    activePartner,
    selectActivePartner,
    activeConsultant,
    isEditingConsultant,
    handleIsEditingConsultant,
  } = useContext(ConsultContext);

  if (!activeConsultant) return null;

  const hasNoPartners = partnersAvailable.length === 0;

  const [partnerIndex, setPartnerIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activePartner) {
      const newIndex = partnersAvailable.findIndex((p) => p.id === activePartner.id);
      setPartnerIndex(newIndex >= 0 ? newIndex : null);
    } else {
      setPartnerIndex(null);
    }
  }, [activePartner, partnersAvailable]);

  const editPartner = () => {
    setIsAddFormActive(true);
    handleEditPartner();
  };

  const removeUser = () => { // TODO: Revisar esta función
    setPartnerIndex(null);
    const emptyPartner: Api.Partner = {
      id: '',
      names: '',
      lastName: '',
      scdLastName: '',
      date: new Date('1900-01-01').toISOString(),
      yearMeet: 0,
    };
    selectActivePartner(emptyPartner);
  };

  const selectedPartner = (e: React.ChangeEvent<HTMLSelectElement>) => { // TODO: Revisar esta función
    const index = parseInt(e.target.value, 10);
    setPartnerIndex(index);
    const selectedPartnerData = partnersAvailable[index];
    selectActivePartner(selectedPartnerData);
  };

  // Función para convertir Person a Api.Partner
  const convertPersonToApiPartner = (person: Person | null): Api.Partner | undefined => {
    if (!person) return undefined;

    return {
      id: person.id,
      names: person.name,
      lastName: person.lastName,
      scdLastName: person.scdLastName,
      date: person.birthDate.toISOString().split('T')[0], // Convertir Date a string yyyy-MM-dd
      yearMeet: person.yearMet || 0,
    };
  };

  if (hasNoPartners || isAddFormActive) {
    return (
      <PartnerForm
        activeConsultant={activeConsultant}
        setIsAddFormActive={setIsAddFormActive}
        isEditing={isEditingConsultant}
        partnerToEdit={convertPersonToApiPartner(activePartner)}
      />
    );
  }

  return (
    <div className="grid grid-cols-12">
      <div className="form-group-inline col-span-5 items-center justify-center">
        <img src={add_user_main} className="mb-3" alt="add_user_main" />

        <p className="font-bold mb-1 mr-2 text-13 flex">
          <button type="button" onClick={() => handleIsEditingConsultant(!isEditingConsultant)}>
            <MdEdit className="text-xl text-gray-400" />
          </button>
          {' '}
          Nombre
        </p>
        <select
          onChange={selectedPartner}
          className="border rounded w-full"
          value={partnerIndex !== null ? partnerIndex : ''}
        >
          {!activePartner && (
            <option value="">
              Selecciona una pareja
            </option>
          )}
          {partnersAvailable.map(({
            id, names, lastName, scdLastName,
          }, index) => (
            <option
              key={id}
              value={index}
            >
              {names}
              {' '}
              {lastName}
              {' '}
              {scdLastName}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group-inline col-span-4 items-center justify-center">
        <p className="font-bold mb-1 mr-2 text-13 w-full">
          <button type="button" onClick={editPartner}>
            <MdEdit className="text-xl text-gray-400" />
          </button>
          {' '}
          Fecha de Nacimiento
        </p>
        <input
          value={activePartner?.getFormBirthDate() || ''}
          type="text"
          className="rounded w-40"
          disabled={hasPartner}
          readOnly
        />
      </div>
      <div className="form-group-inline col-span-2 items-center justify-center">
        <p className="font-bold mb-1 mr-2 text-13">
          <button type="button" onClick={editPartner}>
            <MdEdit className="text-xl text-gray-400" />
          </button>
          {' '}
          Edad
        </p>
        <input
          value={activePartner?.getYearsOld() || ''}
          type="text"
          className="rounded w-10"
          disabled={hasPartner}
          readOnly
        />
      </div>
      <div className="form-group-inline col-span-1 items-center justify-center">
        <button type="button" onClick={removeUser} className="ml-6">
          <img src={c_delete} alt="delete" />
        </button>
      </div>
      <hr className="col-span-12 my-3" />
      <div className="form-group-inline col-span-6 items-center justify-start">
        <img
          src={add_user_main}
          className="mb-3 opacity-0"
          alt="add_user_main"
        />
        <p className="font-bold mb-1 mr-2 text-13 flex">
          <button type="button" onClick={editPartner}>
            <MdEdit className="text-xl text-gray-400" />
          </button>
          {' '}
          Se conocieron en el año:
        </p>
        <input
          value={activePartner?.yearMet || ''}
          type="text"
          className="rounded w-20 text-center"
          disabled={hasPartner}
          readOnly
        />
      </div>
    </div>
  );
}

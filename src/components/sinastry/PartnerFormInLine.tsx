import {
  useContext, useMemo,
} from 'react';
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

  // Obtener la versión más actualizada del partner activo
  const currentActivePartner = useMemo(() => {
    if (!activePartner) return null;

    // Buscar el partner actualizado en partnersAvailable
    const updatedPartner = partnersAvailable.find((p) => p.id === activePartner.id);
    console.log('Debug - activePartner:', activePartner);
    console.log('Debug - partnersAvailable:', partnersAvailable);
    console.log('Debug - updatedPartner:', updatedPartner);

    if (!updatedPartner) return activePartner;

    // Crear un nuevo objeto Person con los datos actualizados
    return new Person({
      id: updatedPartner.id,
      name: updatedPartner.names,
      lastName: updatedPartner.lastName,
      scdLastName: updatedPartner.scdLastName,
      birthDate: updatedPartner.date,
      yearMet: updatedPartner.yearMeet,
    });
  }, [activePartner, partnersAvailable]);

  if (!activeConsultant) return null;

  const hasNoPartners = partnersAvailable.length === 0;

  const editPartner = () => {
    setIsAddFormActive(true);
    handleEditPartner();
  };

  const removeUser = () => { // TODO: Revisar esta función
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
    const partnerId = e.target.value;
    const selectedPartnerData = partnersAvailable.find((p) => p.id === partnerId);
    if (selectedPartnerData) {
      selectActivePartner(selectedPartnerData);
    }
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
        partnerToEdit={convertPersonToApiPartner(currentActivePartner)}
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
          value={currentActivePartner?.id || ''}
        >
          {!currentActivePartner && (
            <option value="">
              Selecciona una pareja
            </option>
          )}
          {partnersAvailable.map(({
            id, names, lastName, scdLastName,
          }) => (
            <option
              key={id}
              value={id}
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
          value={currentActivePartner?.getFormBirthDate() || ''}
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
          value={currentActivePartner?.getYearsOld() || ''}
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
          value={currentActivePartner?.yearMet || ''}
          type="text"
          className="rounded w-20 text-center"
          disabled={hasPartner}
          readOnly
        />
      </div>
    </div>
  );
}

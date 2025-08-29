import { useEffect, useState } from 'react';

import makeConsultant from '@/api/useConsultant';
import useConsult from '@/hooks/useConsult';
import useConsultants from '@/hooks/useConsultants';
import useForm from '@/hooks/useForm';
import add_user_main from '../../assets/icons/add_user_main.svg';

type FormStatus = {
  displayValidations: boolean;
  isValid: boolean;
  validationMsgs: Record<string, string>
};

const FORM_STATUS_INITIAL_STATE: FormStatus = {
  displayValidations: false,
  isValid: false,
  validationMsgs: {},
};

type PartnerDataFormProps = {
  activeConsultant: Api.Consultant;
  setIsAddFormActive: (isActive: boolean) => void;
  isEditing?: boolean;
  partnerDataToEdit?: Api.PartnerData;
};

export default function PartnerDataForm({
  activeConsultant,
  setIsAddFormActive,
  isEditing,
  partnerDataToEdit,
}: PartnerDataFormProps): JSX.Element {
  const { handleIsEditingConsultant, updateConsultantPartners } = useConsult();
  const handleConsultants = useConsultants();
  const addConsultantAsync = makeConsultant();

  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>(FORM_STATUS_INITIAL_STATE);

  const initialForm = {
    name: isEditing && partnerDataToEdit ? partnerDataToEdit.name : '',
    date: isEditing && partnerDataToEdit ? partnerDataToEdit.date : new Date().toISOString().split('T')[0],
    yearMeet: isEditing && partnerDataToEdit ? partnerDataToEdit.yearMeet : new Date().getFullYear(),
  };

  const {
    name,
    date,
    yearMeet,
    handleInputChange,
    setFormError,
    reset,
    updateValues,
  } = useForm(initialForm);

  // Actualizar los valores del formulario cuando partnerDataToEdit cambie
  useEffect(() => {
    console.log('DEBUG - PartnerDataForm - isEditing:', isEditing);
    console.log('DEBUG - PartnerDataForm - partnerDataToEdit:', partnerDataToEdit);
    if (isEditing && partnerDataToEdit) {
      console.log('DEBUG - PartnerDataForm - Actualizando valores con:', partnerDataToEdit);
      updateValues({
        name: partnerDataToEdit.name || '',
        date: partnerDataToEdit.date || new Date().toISOString().split('T')[0],
        yearMeet: partnerDataToEdit.yearMeet || new Date().getFullYear(),
      });
    }
  }, [isEditing, partnerDataToEdit]); // Removí updateValues de las dependencias

  const isFormValid = () => {
    let isValid = true;
    let validationMsgs: Record<string, string> = {};

    const letters = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/;

    if (!name) {
      validationMsgs = { ...validationMsgs, name: 'Requerido' };
      isValid = false;
    } else if (!name.match(letters)) {
      validationMsgs = { ...validationMsgs, name: 'No válido' };
      isValid = false;
    }

    if (!date) {
      validationMsgs = { ...validationMsgs, date: 'Requerido' };
      isValid = false;
    }

    if (!yearMeet || yearMeet < 1900 || yearMeet > new Date().getFullYear()) {
      validationMsgs = { ...validationMsgs, yearMeet: 'Año no válido' };
      isValid = false;
    }

    setFormStatus((prevState) => ({ ...prevState, isValid, validationMsgs }));
  };

  useEffect(() => {
    isFormValid();
  }, [name, date, yearMeet]);

  const closeForm = () => {
    setIsAddFormActive(false);
    handleIsEditingConsultant(false);
    reset();
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formStatus.isValid) {
      setFormStatus((prevState) => ({ ...prevState, displayValidations: true }));
      return;
    }

    setFormError('');
    setIsLoading(true);

    try {
      const newPartnerData: Api.PartnerData = {
        id: isEditing && partnerDataToEdit ? partnerDataToEdit.id : Math.random().toString(36).substring(2, 9),
        name,
        date: date.toString(),
        yearMeet: yearMeet || new Date().getFullYear(),
        partner: isEditing && partnerDataToEdit ? partnerDataToEdit.partner || [] : [],
      };

      const updatedConsultant: Api.Consultant = {
        ...activeConsultant,
        partnerData: isEditing && partnerDataToEdit
          ? activeConsultant.partnerData?.map((p: Api.PartnerData) => (p.id === partnerDataToEdit.id ? newPartnerData : p)) || []
          : [...(activeConsultant.partnerData || []), newPartnerData],
      };

      const consultantsList = handleConsultants.updateConsultant(activeConsultant.id, updatedConsultant);
      await addConsultantAsync.mutateAsync(consultantsList);

      // Actualizar inmediatamente el contexto con el consultor actualizado
      updateConsultantPartners(updatedConsultant);

      closeForm();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Error al guardar el grupo de parejas');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="block w-full mt-3" onSubmit={handleOnSubmit}>
      <h2 className="flex justify-center items-center text-xl font-bold">
        <img src={add_user_main} className="mr-3" alt="add_user_main" />
        {isEditing ? 'Editar Grupo de Parejas' : 'Crear Grupo de Parejas'}
      </h2>

      <div className="flex w-full mt-6">
        <div className="form-group w-1/2">
          <p className="font-bold mb-1">
            Nombre del Grupo
            <span className="text-red-800">*</span>
          </p>
          <input
            id="partnerData-name"
            type="text"
            name="name"
            className="rounded border-[#C4C4C4] border w-11/12"
            onChange={(e) => handleInputChange(e.target)}
            value={name}
            placeholder="Ej: Pareja Principal, Ex Pareja, etc."
          />
          {(formStatus?.displayValidations && formStatus?.validationMsgs?.name) && (
            <span className="form-error">{formStatus.validationMsgs.name}</span>
          )}
        </div>

        <div className="form-group w-1/2">
          <p className="font-bold mb-1">
            Fecha de Creación
            <span className="text-red-800">*</span>
          </p>
          <input
            id="partnerData-date"
            type="date"
            name="date"
            className="rounded border-[#C4C4C4] border w-11/12"
            onChange={(e) => handleInputChange(e.target)}
            value={date}
          />
          {(formStatus?.displayValidations && formStatus?.validationMsgs?.date) && (
            <span className="form-error">{formStatus.validationMsgs.date}</span>
          )}
        </div>
      </div>

      <div className="flex w-full mt-3">
        <div className="form-group w-1/2">
          <p className="font-bold mb-1">
            Año en que se conocieron
            <span className="text-red-800">*</span>
          </p>
          <input
            id="partnerData-yearMeet"
            type="number"
            name="yearMeet"
            min="1900"
            max={new Date().getFullYear()}
            className="rounded border-[#C4C4C4] border w-11/12"
            onChange={(e) => handleInputChange(e.target)}
            value={yearMeet}
            placeholder="Ej: 2020"
          />
          {(formStatus?.displayValidations && formStatus?.validationMsgs?.yearMeet) && (
            <span className="form-error">{formStatus.validationMsgs.yearMeet}</span>
          )}
        </div>
      </div>

      <div className="flex w-full mt-6 justify-center">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 w-full max-w-md">
          <p className="text-sm text-blue-800 font-medium mb-2">
            💡 Información del Grupo
          </p>
          <p className="text-xs text-blue-600">
            Después de crear el grupo, podrás agregar hasta 2 parejas.
            Cada grupo representa una relación específica con su propio año de encuentro.
          </p>
        </div>
      </div>

      <div className="flex w-full mt-3 justify-center">
        <button
          type="submit"
          className="btn-save w-32"
          disabled={isLoading}
        >
          {isLoading ? 'Guardando...' : 'Guardar'}
        </button>

        <button
          className="w-32 btn-cancel rounded-full"
          type="button"
          onClick={closeForm}
          disabled={isLoading}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

PartnerDataForm.defaultProps = {
  isEditing: false,
  partnerDataToEdit: undefined,
};

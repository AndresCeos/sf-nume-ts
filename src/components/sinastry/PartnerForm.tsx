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

type PartnerFormProps = {
  activeConsultant: Api.Consultant;
  setIsAddFormActive: (isActive: boolean) => void;
  isEditing?: boolean;
  partnerToEdit?: Api.Partner;
};

export default function PartnerForm({
  activeConsultant,
  setIsAddFormActive,
  isEditing,
  partnerToEdit,
}: PartnerFormProps): JSX.Element {
  const { handleIsEditingConsultant, updateUserPartnerActive, updateConsultantPartners } = useConsult();
  const handleConsultants = useConsultants();
  const addConsultantAsync = makeConsultant();

  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>(FORM_STATUS_INITIAL_STATE);

  const initialForm = {
    names: isEditing && partnerToEdit ? partnerToEdit.names : '',
    lastName: isEditing && partnerToEdit ? partnerToEdit.lastName : '',
    scdLastName: isEditing && partnerToEdit ? partnerToEdit.scdLastName : '',
    date: isEditing && partnerToEdit ? partnerToEdit.date : '',
    yearMeet: isEditing && partnerToEdit ? partnerToEdit.yearMeet : 0,
  };

  const {
    names,
    lastName,
    scdLastName,
    date,
    yearMeet,
    handleInputChange,
    formError,
    setFormError,
    reset,
  } = useForm(initialForm);

  const isFormValid = () => {
    let isValid = true;
    let validationMsgs: Record<string, string> = {};

    const letters = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;

    if (!names) {
      validationMsgs = { ...validationMsgs, names: 'Requerido' };
      isValid = false;
    } else if (!names.match(letters)) {
      validationMsgs = { ...validationMsgs, name: 'No válido' };
      isValid = false;
    }

    if (!lastName) {
      validationMsgs = { ...validationMsgs, lastName: 'Requerido' };
      isValid = false;
    } else if (!lastName.match(letters)) {
      validationMsgs = { ...validationMsgs, lastName: 'No válido' };
      isValid = false;
    }

    if (!date) {
      validationMsgs = { ...validationMsgs, date: 'Requerido' };
      isValid = false;
    }

    if (!yearMeet || yearMeet < 1) {
      validationMsgs = { ...validationMsgs, yearMeet: 'No válido' };
      isValid = false;
    }

    setFormStatus((prevState) => ({ ...prevState, isValid, validationMsgs }));
  };

  useEffect(() => {
    isFormValid();
  }, [names, lastName, date, yearMeet]);

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
      const newPartner: Api.Partner = {
        id: isEditing && partnerToEdit ? partnerToEdit.id : Math.random().toString(36).substring(2, 9),
        names,
        lastName,
        scdLastName,
        date: date.toString(),
        yearMeet: yearMeet || 0,
      };

      const updatedConsultant: Api.Consultant = {
        ...activeConsultant,
        partner: isEditing && partnerToEdit
          ? activeConsultant.partner?.map((p:Api.Partner) => (p.id === partnerToEdit.id ? newPartner : p)) || []
          : [...(activeConsultant.partner || []), newPartner],
      };

      const consultantsList = handleConsultants.updateConsultant(activeConsultant.id, updatedConsultant);
      await addConsultantAsync.mutateAsync(consultantsList);

      // Actualizar inmediatamente el contexto con el consultor actualizado
      updateConsultantPartners(updatedConsultant);

      // Actualizar el partner activo
      updateUserPartnerActive(newPartner.id);

      closeForm();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Error al guardar la pareja');
    } finally {
      setIsLoading(false);
    }
  };

  const createMarkup = (text: string) => ({ __html: text });

  return (
    <form className="block w-full mt-3" onSubmit={handleOnSubmit}>
      <h2 className="flex justify-center items-center text-xl font-bold">
        <img src={add_user_main} className="mr-3" alt="add_user_main" />
        {isEditing ? 'Editar Pareja' : 'Asignar Pareja'}
      </h2>

      <div className="flex w-full mt-6">
        <div className="form-group w-1/3">
          <p className="font-bold mb-1">
            Nombre(s)
            <span className="text-red-800">*</span>
          </p>
          <input
            id="partner-names"
            type="text"
            name="names"
            className="rounded border-[#C4C4C4] border w-11/12"
            onChange={(e) => handleInputChange(e.target)}
            value={names}
          />
          {(formStatus?.displayValidations && formStatus?.validationMsgs?.name) && (
            <span className="form-error">{formStatus.validationMsgs.name}</span>
          )}
        </div>

        <div className="form-group w-1/3">
          <p className="font-bold mb-1">
            Apellido Paterno
            <span className="text-red-800">*</span>
          </p>
          <input
            id="partner-lastName"
            type="text"
            name="lastName"
            className="rounded border-[#C4C4C4] border w-11/12"
            onChange={(e) => handleInputChange(e.target)}
            value={lastName}
          />
          {(formStatus?.displayValidations && formStatus?.validationMsgs?.lastName) && (
            <span className="form-error">{formStatus.validationMsgs.lastName}</span>
          )}
        </div>

        <div className="form-group w-1/3">
          <p className="font-bold mb-1">Apellido Materno</p>
          <input
            id="partner-scdLastName"
            type="text"
            name="scdLastName"
            className="rounded border-[#C4C4C4] border w-11/12"
            onChange={(e) => handleInputChange(e.target)}
            value={scdLastName}
          />
        </div>
      </div>

      <div className="flex w-full mt-3">
        <div className="form-group w-1/3">
          <p className="font-bold mb-1">
            Fecha de Nacimiento
            <span className="text-red-800">*</span>
          </p>
          <input
            id="partner-date"
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

        <div className="form-group w-1/3">
          <p className="font-bold mb-1">
            Año del evento
            <span className="text-red-800">*</span>
          </p>
          <input
            id="partner-yearMeet"
            type="number"
            name="yearMeet"
            className="rounded border-[#C4C4C4] border w-11/12"
            onChange={(e) => handleInputChange(e.target)}
            value={yearMeet}
          />
          {(formStatus?.displayValidations && formStatus?.validationMsgs?.yearMeet) && (
            <span className="form-error">{formStatus.validationMsgs.yearMeet}</span>
          )}
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

        {isEditing && (
          <button
            className="w-32 btn-cancel rounded-full"
            type="button"
            onClick={closeForm}
            disabled={isLoading}
          >
            Cancelar
          </button>
        )}
      </div>

      {formError && (
        <div
          className="text-red-500 text-center text-sm mt-3"
          dangerouslySetInnerHTML={createMarkup(formError)}
        />
      )}
    </form>
  );
}

PartnerForm.defaultProps = {
  isEditing: false,
  partnerToEdit: undefined,
};

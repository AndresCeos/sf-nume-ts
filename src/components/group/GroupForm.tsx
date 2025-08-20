import { useEffect, useState } from 'react';

import makeConsultant from '@/api/useConsultant';
import useConsult from '@/hooks/useConsult';
import useConsultants from '@/hooks/useConsultants';
import useForm from '@/hooks/useForm';
import add_user_group from '../../assets/icons/add_user_group.svg';

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

type GroupFormProps = {
  activeConsultant: Api.Consultant;
  setIsAddFormActive: (isActive: boolean) => void;
  isEditing?: boolean;
  groupToEdit?: Api.GroupData;
};

export default function GroupForm({
  activeConsultant,
  setIsAddFormActive,
  isEditing,
  groupToEdit,
}: GroupFormProps): JSX.Element {
  const { handleIsEditingConsultant, updateConsultantGroups } = useConsult();
  const handleConsultants = useConsultants();
  const addConsultantAsync = makeConsultant();

  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>(FORM_STATUS_INITIAL_STATE);

  const initialForm = {
    name: isEditing && groupToEdit ? groupToEdit.name : '',
    description: isEditing && groupToEdit ? groupToEdit.description : '',
    date: isEditing && groupToEdit ? groupToEdit.date : new Date().toISOString().split('T')[0],
  };

  const {
    name,
    description,
    date,
    handleInputChange,
    formError,
    setFormError,
    reset,
  } = useForm(initialForm);

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

    if (!description) {
      validationMsgs = { ...validationMsgs, description: 'Requerido' };
      isValid = false;
    }

    if (!date) {
      validationMsgs = { ...validationMsgs, date: 'Requerido' };
      isValid = false;
    }

    setFormStatus((prevState) => ({ ...prevState, isValid, validationMsgs }));
  };

  useEffect(() => {
    isFormValid();
  }, [name, description, date]);

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
      const newGroup: Api.GroupData = {
        id: isEditing && groupToEdit ? groupToEdit.id : Math.random().toString(36).substring(2, 9),
        name,
        description,
        date: date.toString(),
        members: isEditing && groupToEdit ? groupToEdit.members || [] : [],
      };

      const updatedConsultant: Api.Consultant = {
        ...activeConsultant,
        groupData: isEditing && groupToEdit
          ? activeConsultant.groupData?.map((g: Api.GroupData) => (g.id === groupToEdit.id ? newGroup : g)) || []
          : [...(activeConsultant.groupData || []), newGroup],
      };

      const consultantsList = handleConsultants.updateConsultant(activeConsultant.id, updatedConsultant);
      await addConsultantAsync.mutateAsync(consultantsList);

      // Actualizar inmediatamente el contexto con el consultor actualizado
      updateConsultantGroups(updatedConsultant);

      closeForm();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Error al guardar el grupo');
    } finally {
      setIsLoading(false);
    }
  };

  const createMarkup = (text: string) => ({ __html: text });

  return (
    <form className="block w-full mt-3" onSubmit={handleOnSubmit}>
      <h2 className="flex justify-center items-center text-xl font-bold">
        <img src={add_user_group} className="mr-3" alt="add_user_group" />
        {isEditing ? 'Editar Grupo' : 'Crear Grupo'}
      </h2>

      <div className="flex w-full mt-6">
        <div className="form-group w-1/2">
          <p className="font-bold mb-1">
            Nombre del Grupo
            <span className="text-red-800">*</span>
          </p>
          <input
            id="group-name"
            type="text"
            name="name"
            className="rounded border-[#C4C4C4] border w-11/12"
            onChange={(e) => handleInputChange(e.target)}
            value={name}
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
            id="group-date"
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
        <div className="form-group w-full">
          <p className="font-bold mb-1">
            Descripción del Grupo
            <span className="text-red-800">*</span>
          </p>
          <textarea
            id="group-description"
            name="description"
            className="rounded border-[#C4C4C4] border w-full"
            onChange={(e) => handleInputChange(e.target)}
            value={description}
            rows={3}
          />
          {(formStatus?.displayValidations && formStatus?.validationMsgs?.description) && (
            <span className="form-error">{formStatus.validationMsgs.description}</span>
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

        <button
          className="w-32 btn-cancel rounded-full"
          type="button"
          onClick={closeForm}
          disabled={isLoading}
        >
          Cancelar
        </button>
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

GroupForm.defaultProps = {
  isEditing: false,
  groupToEdit: undefined,
};

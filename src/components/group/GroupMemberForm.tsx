import { useEffect, useState } from 'react';

import makeConsultant from '@/api/useConsultant';
import useConsult from '@/hooks/useConsult';
import useConsultants from '@/hooks/useConsultants';
import useForm from '@/hooks/useForm';
import { useTranslation } from 'react-i18next';
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

type GroupMemberFormProps = {
  activeConsultant: Api.Consultant;
  activeGroup: Api.GroupData;
  setIsAddMemberActive: (isActive: boolean) => void;
  isEditing?: boolean;
  memberToEdit?: Api.GroupMember;
};

export default function GroupMemberForm({
  activeConsultant,
  activeGroup,
  setIsAddMemberActive,
  isEditing,
  memberToEdit,
}: GroupMemberFormProps): JSX.Element {
  const { updateConsultantGroups } = useConsult();
  const handleConsultants = useConsultants();
  const addConsultantAsync = makeConsultant();

  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>(FORM_STATUS_INITIAL_STATE);
  const { t } = useTranslation();

  const initialForm = {
    name: isEditing && memberToEdit ? memberToEdit.name : '',
    lastName: isEditing && memberToEdit ? memberToEdit.lastName : '',
    scdLastName: isEditing && memberToEdit ? memberToEdit.scdLastName : '',
    date: isEditing && memberToEdit ? memberToEdit.date : '',
    dateInit: isEditing && memberToEdit ? memberToEdit.dateInit : new Date().getFullYear(),
  };

  const {
    name,
    lastName,
    scdLastName,
    date,
    dateInit,
    handleInputChange,
    setFormError,
    reset,
  } = useForm(initialForm);

  // Función para validar formato de fecha en tiempo real
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;

    // Si el campo está vacío, permitir que se borre
    if (!inputDate) {
      handleInputChange(e.target);
      return;
    }

    // Extraer el año de la fecha (formato YYYY-MM-DD)
    const yearString = inputDate.split('-')[0];

    // Validar que el año no tenga más de 4 dígitos
    if (yearString && yearString.length > 4) {
      return; // No permitir años con más de 4 dígitos
    }

    // Validar que sea una fecha válida
    const dateObj = new Date(inputDate);
    const year = dateObj.getFullYear();

    // Validar que el año sea de 4 dígitos y esté en un rango razonable
    if (Number.isNaN(year) || year < 1000 || year > 9999) {
      // No permitir fechas inválidas
      return;
    }

    handleInputChange(e.target);
  };

  // Función para validar el año de inicio
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const yearValue = e.target.value;

    // Si el campo está vacío, permitir que se borre
    if (!yearValue) {
      handleInputChange(e.target);
      return;
    }

    // Validar que no tenga más de 4 dígitos
    if (yearValue.length > 4) {
      return; // No permitir años con más de 4 dígitos
    }

    handleInputChange(e.target);
  };

  const isFormValid = () => {
    let isValid = true;
    let validationMsgs: Record<string, string> = {};

    const letters = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;

    if (!name) {
      validationMsgs = { ...validationMsgs, name: t('group.validation.required') };
      isValid = false;
    } else if (!name.match(letters)) {
      validationMsgs = { ...validationMsgs, name: t('group.validation.notValid') };
      isValid = false;
    }

    if (!lastName) {
      validationMsgs = { ...validationMsgs, lastName: t('group.validation.required') };
      isValid = false;
    } else if (!lastName.match(letters)) {
      validationMsgs = { ...validationMsgs, lastName: t('group.validation.notValid') };
      isValid = false;
    }

    if (!date) {
      validationMsgs = { ...validationMsgs, date: t('group.validation.required') };
      isValid = false;
    } else {
      // Validar que el año tenga exactamente 4 dígitos
      const yearString = date.toString().split('-')[0];
      if (yearString && yearString.length !== 4) {
        validationMsgs = { ...validationMsgs, date: t('group.validation.yearMustBe4Digits') };
        isValid = false;
      } else {
        const year = parseInt(yearString, 10);
        if (Number.isNaN(year) || year < 1000 || year > 9999) {
          validationMsgs = { ...validationMsgs, date: t('group.validation.invalidYearValue') };
          isValid = false;
        } else {
          // Validar que no sea una fecha futura
          const dateObj = new Date(date);
          if (dateObj > new Date()) {
            validationMsgs = { ...validationMsgs, date: t('group.validation.dateCantBeFuture') };
            isValid = false;
          } else if (year < 1900 || year > 2100) {
            validationMsgs = { ...validationMsgs, date: t('group.validation.yearBetween1900And2100') };
            isValid = false;
          }
        }
      }
    }

    if (!dateInit) {
      validationMsgs = { ...validationMsgs, dateInit: t('group.validation.required') };
      isValid = false;
    } else {
      const yearInit = parseInt(dateInit.toString(), 10);
      const yearInitString = dateInit.toString();
      if (yearInitString.length !== 4) {
        validationMsgs = { ...validationMsgs, dateInit: t('group.validation.yearMustBe4Digits') };
        isValid = false;
      } else if (Number.isNaN(yearInit) || yearInit < 1900 || yearInit > new Date().getFullYear()) {
        validationMsgs = { ...validationMsgs, dateInit: t('group.validation.invalidYearOrOutOfRange') };
        isValid = false;
      }
    }

    setFormStatus((prevState) => ({ ...prevState, isValid, validationMsgs }));
  };

  useEffect(() => {
    isFormValid();
  }, [name, lastName, date, dateInit]);

  const closeForm = () => {
    setIsAddMemberActive(false);
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
      const newMember: Api.GroupMember = {
        id: isEditing && memberToEdit ? memberToEdit.id : Math.random().toString(36).substring(2, 9),
        name,
        lastName,
        scdLastName,
        date: date.toString(),
        dateInit: dateInit || new Date().getFullYear(),
      };

      const updatedGroup: Api.GroupData = {
        ...activeGroup,
        lastInit: dateInit || new Date().getFullYear(),
        members: isEditing && memberToEdit
          ? activeGroup.members?.map((m: Api.GroupMember) => (m.id === memberToEdit.id ? newMember : m)) || []
          : [...(activeGroup.members || []), newMember],
      };

      const updatedConsultant: Api.Consultant = {
        ...activeConsultant,
        groupData: activeConsultant.groupData?.map((g: Api.GroupData) => (g.id === activeGroup.id ? updatedGroup : g)) || [],
      };

      const consultantsList = handleConsultants.updateConsultant(activeConsultant.id, updatedConsultant);
      await addConsultantAsync.mutateAsync(consultantsList);

      // Actualizar inmediatamente el contexto con el consultor actualizado
      updateConsultantGroups(updatedConsultant);

      closeForm();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : t('group.errors.errorSavingMember') || '');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="block w-full mt-3" onSubmit={handleOnSubmit}>
      <h2 className="flex justify-center items-center text-xl font-bold">
        <img src={add_user_group} className="mr-3" alt="add_user_group" />
        {isEditing ? t('group.editMember') : t('group.addMemberToGroup')}
      </h2>
      <p className="text-center text-sm text-gray-600 mt-2">
        {t('group.groupOf')}
        {' '}
        {activeGroup.name}
      </p>

      <div className="flex w-full mt-6">
        <div className="form-group w-1/3">
          <p className="font-bold mb-1">
            {t('group.names')}
            <span className="text-red-800">*</span>
          </p>
          <input
            id="member-name"
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

        <div className="form-group w-1/3">
          <p className="font-bold mb-1">
            {t('group.paternalLastName')}
            <span className="text-red-800">*</span>
          </p>
          <input
            id="member-lastName"
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
          <p className="font-bold mb-1">{t('group.maternalLastName')}</p>
          <input
            id="member-scdLastName"
            type="text"
            name="scdLastName"
            className="rounded border-[#C4C4C4] border w-11/12"
            onChange={(e) => handleInputChange(e.target)}
            value={scdLastName}
          />
        </div>
      </div>

      <div className="flex w-full mt-3">
        <div className="form-group w-1/2">
          <p className="font-bold mb-1">
            {t('forms.birthDate')}
            <span className="text-red-800">*</span>
          </p>
          <input
            id="member-date"
            type="date"
            name="date"
            className="rounded border-[#C4C4C4] border w-11/12"
            onChange={handleDateChange}
            value={date}
            min="1900-01-01"
            max="2100-12-31"
          />
          {(formStatus?.displayValidations && formStatus?.validationMsgs?.date) && (
            <span className="form-error">{formStatus.validationMsgs.date}</span>
          )}
        </div>

        <div className="form-group w-1/2">
          <p className="font-bold mb-1">
            {t('group.yearStartInGroup')}
            <span className="text-red-800">*</span>
          </p>
          <input
            id="member-dateInit"
            type="number"
            name="dateInit"
            className="rounded border-[#C4C4C4] border w-11/12"
            onChange={handleYearChange}
            value={dateInit}
            min="1900"
            max={new Date().getFullYear()}
          />
          {(formStatus?.displayValidations && formStatus?.validationMsgs?.dateInit) && (
            <span className="form-error">{formStatus.validationMsgs.dateInit}</span>
          )}
        </div>
      </div>

      <div className="flex w-full mt-3 justify-center">
        <button
          type="submit"
          className="btn-save w-32"
          disabled={isLoading}
        >
          {isLoading ? t('group.saving') : t('group.save')}
        </button>

        <button
          className="w-32 btn-cancel rounded-full"
          type="button"
          onClick={closeForm}
          disabled={isLoading}
        >
          {t('group.cancel')}
        </button>
      </div>

    </form>
  );
}

GroupMemberForm.defaultProps = {
  isEditing: false,
  memberToEdit: undefined,
};

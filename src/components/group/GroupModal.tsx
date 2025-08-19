import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import makeConsultant from '@/api/useConsultant';
import useConsult from '@/hooks/useConsult';
import useConsultants from '@/hooks/useConsultants';
import useForm from '@/hooks/useForm';

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

type GroupModalProps = {
  activeConsultant: Api.Consultant;
  isOpen: boolean;
  onClose: () => void;
  groupToEdit?: Api.GroupData | null;
  isEditing?: boolean;
};

export default function GroupModal({
  activeConsultant, isOpen, onClose, groupToEdit,
  isEditing,
}: GroupModalProps) {
  const { t } = useTranslation();
  console.log('isEditing', isEditing);
  console.log('groupToEdit', groupToEdit);

  const handleConsultants = useConsultants();
  const addConsultantAsync = makeConsultant();
  const { createGroup } = useConsult();

  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>(FORM_STATUS_INITIAL_STATE);

  const initialForm = {
    name: isEditing ? groupToEdit?.name : '',
    description: isEditing && groupToEdit ? groupToEdit.description : '',
    date: isEditing && groupToEdit ? groupToEdit.date : format(new Date(), 'yyyy-MM-dd'),
  };

  console.log('initialForm', initialForm);
  const {
    name, description, date, handleInputChange,
  } = useForm(initialForm);

  const isFormValid = () => {
    let isValid = true;
    let validationMsgs: Record<string, string> = {};
    const letters = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;

    if (name === '') {
      validationMsgs = { ...validationMsgs, name: 'Requerido' };
      isValid = false;
    } else if (!name.match(letters)) {
      validationMsgs = { ...validationMsgs, name: 'No válido' };
      isValid = false;
    }
    if (description === '') {
      validationMsgs = { ...validationMsgs, description: 'Requerido' };
      isValid = false;
    }
    if (date === '') {
      validationMsgs = { ...validationMsgs, date: 'Requerido' };
      isValid = false;
    }
    setFormStatus((prevState) => ({ ...prevState, isValid, validationMsgs }));
  };

  useEffect(() => {
    isFormValid();
  }, [name, description, date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formStatus.isValid) {
      setFormStatus((prevState) => ({ ...prevState, displayValidations: true }));
      return;
    }

    setIsLoading(true);

    try {
      const newGroup: Api.GroupData = {
        id: isEditing && groupToEdit ? groupToEdit.id : Math.random().toString(36).substring(2, 9),
        name: name || '',
        description,
        date,
        members: isEditing && groupToEdit ? groupToEdit.members : [],
      };

      const updatedConsultant: Api.Consultant = {
        ...activeConsultant,
        groupData: (isEditing && groupToEdit)
          ? activeConsultant?.groupData?.map((group) => (group.id === groupToEdit?.id ? newGroup : group)) || []
          : [...(activeConsultant?.groupData || []), newGroup],
      };

      const consultantsList = handleConsultants.updateConsultant(activeConsultant.id, updatedConsultant);
      await addConsultantAsync.mutateAsync(consultantsList);
      createGroup(newGroup);

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="block w-full mt-3">
      <div className="form-group w-full">
        <p className="font-bold mb-1">
          {t('group.name')}
          {' '}
          <span className="text-red-800">*</span>
        </p>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => handleInputChange(e.target)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {(formStatus?.displayValidations && formStatus?.validationMsgs?.name) && (
        <span className="form-error">{formStatus.validationMsgs.name}</span>
        )}
      </div>

      <div className="form-group w-full">
        <p className="font-bold mb-1">
          {t('group.description')}
          {' '}
          <span className="text-red-800">*</span>
        </p>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => handleInputChange(e.target)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {(formStatus?.displayValidations && formStatus?.validationMsgs?.description) && (
        <span className="form-error">{formStatus.validationMsgs.description}</span>
        )}
      </div>

      <div className="form-group w-full">
        <p className="font-bold mb-1">
          {t('group.date')}
          {' '}
          <span className="text-red-800">*</span>
        </p>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => handleInputChange(e.target)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {(formStatus?.displayValidations && formStatus?.validationMsgs?.date) && (
        <span className="form-error">{formStatus.validationMsgs.date}</span>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="btn-cancel"
        >
          {t('common.cancel')}
        </button>
        <button
          type="submit"
          className="btn-save"
        >
          {isEditing ? t('common.update') : t('common.create')}
        </button>
      </div>
    </form>
  );
}

GroupModal.defaultProps = {
  isEditing: false,
  groupToEdit: undefined,
};

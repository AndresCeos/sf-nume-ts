import { format } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import makeConsultant from '@/api/useConsultant';
import MyModal from '@/components/MyModal';
import { ConsultContext } from '@/context/ConsultContext';
import useConsultants from '@/hooks/useConsultants';
import useGroups from '@/hooks/useGroups';

interface GroupMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  memberToEdit: Api.GroupMember | null;
}

export default function GroupMemberModal({
  isOpen, onClose, groupId, memberToEdit,
}: GroupMemberModalProps) {
  const { t } = useTranslation();
  const { activeGroup } = useGroups();
  const { activeConsultant } = useContext(ConsultContext);
  const handleConsultants = useConsultants();
  const addConsultantAsync = makeConsultant();
  if (!activeConsultant || !activeGroup) return null;
  console.log(groupId);

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    scdLastName: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    dateInit: new Date().getFullYear(),
  });

  const isEditing = !!memberToEdit;

  useEffect(() => {
    if (memberToEdit) {
      setFormData({
        name: memberToEdit.name,
        lastName: memberToEdit.lastName,
        scdLastName: memberToEdit.scdLastName,
        date: memberToEdit.date,
        dateInit: memberToEdit.dateInit,
      });
    } else {
      setFormData({
        name: '',
        lastName: '',
        scdLastName: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        dateInit: new Date().getFullYear(),
      });
    }
  }, [memberToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newMember: Api.GroupMember = {
      id: isEditing && memberToEdit ? memberToEdit.id : Math.random().toString(36).substring(2, 9),
      name: formData.name,
      lastName: formData.lastName,
      scdLastName: formData.scdLastName,
      date: formData.date,
      dateInit: formData.dateInit,
    };

    const updatedGroup: Api.GroupData = {
      ...activeGroup,
      members: isEditing && memberToEdit ? activeGroup?.members?.map((member) => (member.id === memberToEdit.id ? newMember : member)) || [] : [...(activeGroup?.members || []), newMember],
    };

    const consultantsList = handleConsultants.updateConsultant(activeConsultant.id, updatedGroup);
    await addConsultantAsync.mutateAsync(consultantsList);

    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value, 10) || 0,
    }));
  };

  return (
    <MyModal isOpen={isOpen} onClose={onClose} size="small" title={isEditing ? t('group.editMember') : t('group.addMember')} setIsOpen={onClose} isLoading={false}>
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {isEditing ? t('group.editMember') : t('group.addMember')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              {t('group.memberName')}
              {' '}
              *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('group.memberNamePlaceholder') as string}
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              {t('group.memberLastName')}
              {' '}
              *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('group.memberLastNamePlaceholder') as string}
            />
          </div>

          <div>
            <label htmlFor="scdLastName" className="block text-sm font-medium text-gray-700 mb-1">
              {t('group.memberScdLastName')}
            </label>
            <input
              type="text"
              id="scdLastName"
              name="scdLastName"
              value={formData.scdLastName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('group.memberScdLastNamePlaceholder') as string}
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              {t('group.memberBirthDate')}
              {' '}
              *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="dateInit" className="block text-sm font-medium text-gray-700 mb-1">
              {t('group.memberDateInit')}
              {' '}
              *
            </label>
            <input
              type="number"
              id="dateInit"
              name="dateInit"
              value={formData.dateInit}
              onChange={handleNumberChange}
              required
              min="1900"
              max="2100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="2024"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isEditing ? t('common.update') : t('common.add')}
            </button>
          </div>
        </form>
      </div>
    </MyModal>
  );
}

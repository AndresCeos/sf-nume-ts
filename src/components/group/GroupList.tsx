import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

import { ConsultContext } from '@/context/ConsultContext';
import useGroups from '@/hooks/useGroups';
import GroupMemberModal from './GroupMemberModal';
import GroupModal from './GroupModal';

export default function GroupList() {
  const { t } = useTranslation();
  const {
    groupData, activeGroup, selectActiveGroup,
  } = useGroups();

  const { activeConsultant, isEditingConsultant, handleIsEditingConsultant } = useContext(ConsultContext);

  if (!activeConsultant) return null;

  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [groupToEdit, setGroupToEdit] = useState<Api.GroupData | null>(null);
  const [memberToEdit, setMemberToEdit] = useState<Api.GroupMember | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');

  const handleCreateGroup = () => {
    setGroupToEdit(null);
    setIsGroupModalOpen(true);
  };

  const handleEditGroup = (group: Api.GroupData) => {
    setGroupToEdit(group);
    handleIsEditingConsultant(true);
    setIsGroupModalOpen(true);
  };
  const closeModalGroupData = () => {
    setIsGroupModalOpen(false);
    handleIsEditingConsultant(false);
  };

  const handleDeleteGroup = async (groupId: string) => {
    const result = await Swal.fire({
      title: t('common.delete') as string,
      text: t('group.confirmDelete') as string,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: t('common.delete') as string,
      cancelButtonText: t('common.cancel') as string,
    });

    if (result.isConfirmed) {
      deleteGroup(groupId);
    }
  };
  const hasNoMembers = activeGroup?.members?.length === 0;

  const handleAddMember = (groupId: string) => {
    setSelectedGroupId(groupId);
    setMemberToEdit(null);
    setIsMemberModalOpen(true);
  };

  const handleEditMember = (groupId: string, member: Api.GroupMember) => {
    setSelectedGroupId(groupId);
    setMemberToEdit(member);
    setIsMemberModalOpen(true);
  };

  const handleDeleteMember = async (groupId: string, memberId: string) => {
    const result = await Swal.fire({
      title: t('common.delete') as string,
      text: t('group.confirmDeleteMember') as string,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: t('common.delete') as string,
      cancelButtonText: t('common.cancel') as string,
    });

    if (result.isConfirmed) {
      deleteGroupMember(groupId, memberId);
    }
  };

  const handleSelectGroup = (group: Api.GroupData) => {
    selectActiveGroup(activeGroup?.id === group.id ? null : group);
  };

  return (
    <div className="space-y-6">
      {hasNoMembers && (
        <div className="text-center text-gray-500 flex items-center justify-center flex-col">
          {t('group.noMembers')}
          <button type="button" onClick={() => handleAddMember(activeGroup?.id || '')}>
            {t('group.addMember')}
          </button>
        </div>
      )}
      {/* Modals */}
      <GroupModal
        activeConsultant={activeConsultant}
        isOpen={isGroupModalOpen}
        onClose={closeModalGroupData}
        groupToEdit={groupToEdit}
        isEditing={isEditingConsultant}
      />

      <GroupMemberModal
        isOpen={isMemberModalOpen}
        onClose={() => setIsMemberModalOpen(false)}
        groupId={selectedGroupId}
        memberToEdit={memberToEdit}
      />
    </div>
  );
}

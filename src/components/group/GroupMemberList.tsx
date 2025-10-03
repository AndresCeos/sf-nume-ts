import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdEdit } from 'react-icons/md';
import Swal from 'sweetalert2';

import makeConsultant from '@/api/useConsultant';
import { ConsultContext } from '@/context/ConsultContext';
import useConsultants from '@/hooks/useConsultants';
import Person from '@/resources/Person';
import add_user_group from '../../assets/icons/add_user_group.svg';
import c_delete from '../../assets/icons/c_delete.svg';
import GroupMemberForm from './GroupMemberForm';

type GroupMemberListProps = {
  activeGroup: Api.GroupData;
};

export default function GroupMemberList({ activeGroup }: GroupMemberListProps) {
  const { activeConsultant, updateConsultantGroups, groupsAvailable } = useContext(ConsultContext);
  const handleConsultants = useConsultants();
  const addConsultantAsync = makeConsultant();
  const { t } = useTranslation();

  // Obtener la versión más actualizada del grupo desde el contexto
  const currentActiveGroup = groupsAvailable.find((g) => g.id === activeGroup.id) || activeGroup;
  const [isAddMemberActive, setIsAddMemberActive] = useState(false);
  const [editingMember, setEditingMember] = useState<Api.GroupMember | null>(null);

  if (!activeConsultant || !activeGroup) return null;

  const handleEditMember = (member: Api.GroupMember) => {
    setEditingMember(member);
    setIsAddMemberActive(true);
  };

  const handleRemoveMember = async (memberId: string) => {
    // Buscar el miembro para mostrar su nombre en la confirmación
    const memberToRemove = currentActiveGroup.members?.find((m) => m.id === memberId);
    const memberName = memberToRemove ? `${memberToRemove.name} ${memberToRemove.lastName}` : t('common.thisMember');

    // Mostrar confirmación con SweetAlert2
    const result = await Swal.fire({
      title: t('group.alerts.areYouSure'),
      text: t('group.alerts.confirmDeleteMember', { memberName }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: t('group.alerts.yesDelete'),
      cancelButtonText: t('group.cancel'),
    });

    if (result.isConfirmed) {
      try {
        // Mostrar loading
        Swal.fire({
          title: t('group.alerts.deleting'),
          text: t('group.alerts.deletingMember'),
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const updatedGroup: Api.GroupData = {
          ...currentActiveGroup,
          members: currentActiveGroup.members?.filter((m) => m.id !== memberId) || [],
        };

        const updatedConsultant: Api.Consultant = {
          ...activeConsultant,
          groupData: activeConsultant.groupData?.map((g: Api.GroupData) => (g.id === currentActiveGroup.id ? updatedGroup : g)) || [],
        };

        // Persistir cambios en la base de datos
        const consultantsList = handleConsultants.updateConsultant(activeConsultant.id, updatedConsultant);
        await addConsultantAsync.mutateAsync(consultantsList);

        // Actualizar el contexto con el consultor actualizado
        updateConsultantGroups(updatedConsultant);

        // Cerrar loading y mostrar mensaje de éxito
        Swal.fire(
          t('group.alerts.deleted'),
          `${memberName} ${t('group.alerts.memberDeletedSuccess')}`,
          'success',
        );
      } catch (error) {
        console.error('Error al eliminar miembro:', error);

        // Mostrar mensaje de error
        Swal.fire(
          t('group.alerts.error'),
          t('group.errors.deleteMember'),
          'error',
        );
      }
    }
  };

  const closeMemberForm = () => {
    setIsAddMemberActive(false);
    setEditingMember(null);
  };

  const convertMemberToPerson = (member: Api.GroupMember): Person => new Person({
    id: member.id,
    name: member.name,
    lastName: member.lastName,
    scdLastName: member.scdLastName,
    birthDate: member.date,
  });

  if (isAddMemberActive) {
    return (
      <GroupMemberForm
        activeConsultant={activeConsultant}
        activeGroup={currentActiveGroup}
        setIsAddMemberActive={closeMemberForm}
        isEditing={!!editingMember}
        memberToEdit={editingMember || undefined}
      />
    );
  }

  return (
    <div className="p-4">
      {/* Add Member Button */}
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={() => setIsAddMemberActive(true)}
          className="bg-gold text-white px-4 py-2 rounded text-sm font-medium"
        >
          {t('group.addMember')}
        </button>
      </div>

      {/* Members List */}
      {currentActiveGroup.members && currentActiveGroup.members.length > 0 ? (
        <div className="space-y-3">
          {currentActiveGroup.members.map((member) => {
            const memberPerson = convertMemberToPerson(member);
            return (
              <div key={member.id} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center flex-1">
                  <div className="w-8 h-8 flex justify-center items-center rounded-full bg-blue-100 mr-3">
                    <img src={add_user_group} className="w-4 h-4" alt="member" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">
                      {memberPerson.name}
                      {' '}
                      {memberPerson.lastName}
                      {' '}
                      {memberPerson.scdLastName}
                    </div>
                    <div className="text-sm text-gray-600">
                      {memberPerson.getFormBirthDate()}
                      {' '}
                      •
                      {memberPerson.getYearsOld()}
                      {' '}
                      {t('group.years')} • {t('group.start')}
                      {member.dateInit}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleEditMember(member)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <MdEdit className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(member.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <img src={c_delete} alt="delete" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <img src={add_user_group} className="w-16 h-16 mx-auto mb-4 opacity-50" alt="no members" />
          <p>{t('group.noMembersInThisGroup')}</p>
          <p className="text-sm">{t('group.clickToAddMember')}</p>
        </div>
      )}
    </div>
  );
}

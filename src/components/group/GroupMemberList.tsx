import { useContext, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import Swal from 'sweetalert2';

import { ConsultContext } from '@/context/ConsultContext';
import Person from '@/resources/Person';
import add_user_group from '../../assets/icons/add_user_group.svg';
import c_delete from '../../assets/icons/c_delete.svg';
import GroupMemberForm from './GroupMemberForm';

type GroupMemberListProps = {
  activeGroup: Api.GroupData;
};

export default function GroupMemberList({ activeGroup }: GroupMemberListProps) {
  const { activeConsultant, updateConsultantGroups, groupsAvailable } = useContext(ConsultContext);

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
    const memberName = memberToRemove ? `${memberToRemove.name} ${memberToRemove.lastName}` : 'este miembro';

    // Mostrar confirmación con SweetAlert2
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Estás seguro de que quieres eliminar a ${memberName} del grupo?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        const updatedGroup: Api.GroupData = {
          ...currentActiveGroup,
          members: currentActiveGroup.members?.filter((m) => m.id !== memberId) || [],
        };

        const updatedConsultant: Api.Consultant = {
          ...activeConsultant,
          groupData: activeConsultant.groupData?.map((g: Api.GroupData) => (g.id === currentActiveGroup.id ? updatedGroup : g)) || [],
        };

        // Aquí deberías hacer la llamada al API para persistir los cambios
        // Por ahora solo actualizamos el contexto
        updateConsultantGroups(updatedConsultant);

        // Mostrar mensaje de éxito
        Swal.fire(
          '¡Eliminado!',
          `${memberName} ha sido eliminado del grupo.`,
          'success',
        );
      } catch (error) {
        console.error('Error al eliminar miembro:', error);

        // Mostrar mensaje de error
        Swal.fire(
          'Error',
          'No se pudo eliminar el miembro. Por favor, inténtalo de nuevo.',
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
    <div className="mt-6">
      <div className="bg-black text-white text-base font-bold h-8 flex items-center justify-between rounded-tl-2xl rounded-tr-2xl">
        <div className="flex items-center pl-5">
          Miembros del Grupo:
          {' '}
          {currentActiveGroup.name}
        </div>
        <button
          type="button"
          onClick={() => setIsAddMemberActive(true)}
          className="w-60 text-sm bg-gold px-4 font-bold h-11 mb-3 rounded-t-3xl rounded-bl-3xl"
        >
          Agregar Miembro
        </button>
      </div>

      <div className="bg-white border border-gray-300 rounded-b-2xl p-4">
        {currentActiveGroup.members && currentActiveGroup.members.length > 0 ? (
          <div className="space-y-3">
            {currentActiveGroup.members.map((member) => {
              const memberPerson = convertMemberToPerson(member);
              return (
                <div key={member.id} className="grid grid-cols-12 items-center border-b border-gray-200 pb-2">
                  <div className="col-span-3">
                    <div className="flex items-center">
                      <img src={add_user_group} className="w-6 h-6 mr-2" alt="member" />
                      <span className="font-medium">
                        {memberPerson.fullName}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <span className="text-sm text-gray-600">
                      {memberPerson.getFormBirthDate()}
                    </span>
                  </div>

                  <div className="col-span-2">
                    <span className="text-sm text-gray-600">
                      {memberPerson.getYearsOld()}
                      {' '}
                      años
                    </span>
                  </div>

                  <div className="col-span-2">
                    <span className="text-sm text-gray-600">
                      Inicio:
                      {' '}
                      {member.dateInit}
                    </span>
                  </div>

                  <div className="col-span-2 flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => handleEditMember(member)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <MdEdit className="text-xl" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <img src={c_delete} alt="delete" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <img src={add_user_group} className="w-16 h-16 mx-auto mb-4 opacity-50" alt="no members" />
            <p>No hay miembros en este grupo</p>
            <p className="text-sm">Haz clic en &quot;Agregar Miembro&quot; para comenzar</p>
          </div>
        )}
      </div>
    </div>
  );
}

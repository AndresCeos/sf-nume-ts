import { useContext, useEffect } from 'react';
import { MdEdit } from 'react-icons/md';

import { ConsultContext } from '@/context/ConsultContext';
import add_user_group from '../../assets/icons/add_user_group.svg';
import c_delete from '../../assets/icons/c_delete.svg';
import GroupForm from './GroupForm';
import GroupMemberList from './GroupMemberList';

type GroupFormInLineProps = {
  setIsAddFormActive: (isAddFormActive: boolean) => void;
  handleEditGroup: () => void;
  isAddFormActive: boolean;
  hasGroup: boolean;
};

export default function GroupFormInLine({
  setIsAddFormActive,
  handleEditGroup,
  isAddFormActive,
  hasGroup,
}: GroupFormInLineProps) {
  const {
    groupsAvailable,
    activeGroup,
    selectActiveGroup,
    isEditingConsultant,
    handleIsEditingConsultant,
    activeConsultant,
  } = useContext(ConsultContext);

  // Obtener la versión más actualizada del grupo activo
  const currentActiveGroup = activeGroup ? (groupsAvailable.find((g) => g.id === activeGroup.id) || activeGroup) : null;

  const hasNoGroups = hasGroup;

  useEffect(() => {
    // Este efecto se mantiene para futuras funcionalidades relacionadas con el índice del grupo
    // Por ahora solo verifica que el grupo activo esté sincronizado
    if (currentActiveGroup && !groupsAvailable.find((g) => g.id === currentActiveGroup.id)) {
      // El grupo activo ya no existe en la lista disponible
      console.warn('Active group no longer available in groups list');
    }
  }, [currentActiveGroup, groupsAvailable]);

  const editGroup = () => {
    setIsAddFormActive(true);
    handleEditGroup();
  };

  const removeGroup = () => {
    const emptyGroup: Api.GroupData = {
      id: '',
      name: '',
      description: '',
      date: new Date('1900-01-01').toISOString(),
      members: [],
    };
    selectActiveGroup(emptyGroup);
  };

  const selectedGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const selectedGroupData = groupsAvailable.find((group) => group.id === id);
    if (selectedGroupData) {
      selectActiveGroup(selectedGroupData);
    }
  };

  if (!activeConsultant) return null;

  if (hasNoGroups || isAddFormActive) {
    return (
      <GroupForm
        activeConsultant={activeConsultant}
        setIsAddFormActive={setIsAddFormActive}
        isEditing={isEditingConsultant}
        groupToEdit={activeGroup || undefined}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="form-group-inline col-span-10 items-center justify-center">
          <img src={add_user_group} className="mb-3" alt="add_user_group" />
          <p className="font-bold mb-1 mr-2 text-13 flex">
            <button type="button" onClick={() => handleIsEditingConsultant(!isEditingConsultant)}>
              <MdEdit className="text-xl text-gray-400" />
            </button>
            {' '}
            Grupo
          </p>
          <select
            onChange={selectedGroup}
            className="border rounded w-full"
            value={currentActiveGroup?.id || ''}
          >
            {!currentActiveGroup && (
            <option value="">
              Selecciona un grupo
            </option>
            )}
            {groupsAvailable.map((group: Api.GroupData) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group-inline col-span-2 items-center justify-center">
          <button type="button" onClick={removeGroup} className="ml-6">
            <img src={c_delete} alt="delete" />
          </button>
        </div>
        <div className="form-group-inline col-span-12 items-center justify-center mt-3">
          <button
            type="button"
            onClick={() => setIsAddFormActive(true)}
            className="btn-save w-40 text-sm"
          >
            Crear Grupo
          </button>
        </div>
        <hr className="col-span-12 my-3" />
        <div className="form-group-inline col-span-12 items-center justify-start">
          <img
            src={add_user_group}
            className="mb-3 opacity-0"
            alt="add_user_group"
          />
          <p className="font-bold mb-1 mr-2 text-13 flex">
            <button type="button" onClick={editGroup}>
              <MdEdit className="text-xl text-gray-400" />
            </button>
            {' '}
            Descripción:
          </p>
          <input
            type="text"
            className="rounded w-full"
            value={currentActiveGroup?.description || ''}
            disabled
            readOnly
          />
        </div>
        <div className="form-group-inline col-span-6 items-center justify-start">
          <img
            src={add_user_group}
            className="mb-3 opacity-0"
            alt="add_user_group"
          />
          <p className="font-bold mb-1 mr-2 text-13 flex">
            <button type="button" onClick={editGroup}>
              <MdEdit className="text-xl text-gray-400" />
            </button>
            {' '}
            Fecha de Creación:
          </p>
          <input
            value={currentActiveGroup?.date ? new Date(currentActiveGroup.date).toLocaleDateString() : ''}
            type="text"
            className="rounded w-32 text-center"
            disabled
            readOnly
          />
        </div>
        <div className="form-group-inline col-span-6 items-center justify-start">
          <img
            src={add_user_group}
            className="mb-3 opacity-0"
            alt="add_user_group"
          />
          <p className="font-bold mb-1 mr-2 text-13 flex">
            <button type="button" onClick={editGroup}>
              <MdEdit className="text-xl text-gray-400" />
            </button>
            {' '}
            Miembros:
          </p>
          <input
            value={currentActiveGroup?.members?.length || 0}
            type="text"
            className="rounded w-16 text-center"
            disabled
            readOnly
          />
        </div>
      </div>

      {/* Mostrar lista de miembros si hay un grupo activo */}
      {currentActiveGroup && currentActiveGroup.id && (
        <GroupMemberList activeGroup={currentActiveGroup} />
      )}
    </>
  );
}

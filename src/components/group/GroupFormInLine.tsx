import { useContext, useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';

import { ConsultContext } from '@/context/ConsultContext';

import add_user_main from '../../assets/icons/add_user_main.svg';

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
    groupsAvailable, activeGroup, selectActiveGroup, isEditingConsultant, handleIsEditingConsultant,
  } = useContext(ConsultContext);

  const [groupIndex, setGroupIndex] = useState<number | null>(null);

  const hasNoGroups = hasGroup;

  useEffect(() => {
    if (activeGroup) {
      const newIndex = groupsAvailable.findIndex((g) => g.id === activeGroup.id);
      setGroupIndex(newIndex >= 0 ? newIndex : null);
    } else {
      setGroupIndex(null);
    }
  }, [activeGroup, groupsAvailable]);

  const editGroup = () => {
    setIsAddFormActive(true);
    handleEditGroup();
  };

  const selectedGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const index = groupsAvailable.findIndex((group) => group.id === id);
    setGroupIndex(index);
    const selectedGroupData = groupsAvailable[index];
    selectActiveGroup(selectedGroupData);
  };
  console.log('groupsAvailable', groupsAvailable);
  console.log('activeGroup', activeGroup);

  if (hasNoGroups || isAddFormActive) {
    return (
      <div>form de grupos pendientes</div>
    );
  }
  console.log('selectedGroup', selectedGroup);
  console.log('activeGroup', activeGroup);

  return (
    <div className="grid grid-cols-12">
      <div className="form-group-inline col-span-10 items-center justify-center">
        <img src={add_user_main} className="mb-3" alt="add_user_main" />
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
          value={groupIndex !== null ? groupIndex : ''}
        >
          {groupsAvailable.length === 0 && (
            <option value="">
              No hay grupos
            </option>
          )}
          {groupsAvailable.map((group:Api.GroupData, index:number) => (
            <option key={group.id} value={index}>
              {group.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group-inline col-span-12 items-center justify-center">
        <p className="font-bold mb-1 mr-2 text-13 w-full">
          <button type="button" onClick={editGroup}>
            <MdEdit className="text-xl text-gray-400" />
          </button>
        </p>
        <input
          type="text"
          className="rounded w-full"
          value={activeGroup?.description || ''}
          disabled
          readOnly
        />
      </div>
    </div>

  );
}

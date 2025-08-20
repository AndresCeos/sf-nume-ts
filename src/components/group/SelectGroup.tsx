import { useContext, useEffect, useState } from 'react';

import { MdEdit } from 'react-icons/md';
import { TiPlus } from 'react-icons/ti';

import { ConsultContext } from '@/context/ConsultContext';
import GroupFormInLine from './GroupFormInLine';

export default function SelectGroup() {
  const {
    groupsAvailable, isEditingConsultant, handleIsEditingConsultant,
  } = useContext(ConsultContext);

  const [isAddFormActive, setIsAddFormActive] = useState(false);
  const [groupDataEmpty, setGroupDataEmpty] = useState(true);

  useEffect(() => {
    if (groupsAvailable.length === 0) {
      setGroupDataEmpty(true);
    } else {
      setGroupDataEmpty(false);
    }
  }, [groupsAvailable]);

  const handleEditGroup = () => {
    handleIsEditingConsultant(!isEditingConsultant);
  };

  return (
    <div className="grid mt-8 mx-14 col-span-12 mb-10 ">
      <div className="bg-black text-white text-base font-bold h-8 flex items-center justify-between rounded-tl-2xl rounded-tr-2xl">
        <div className="flex items-center">
          <div
            className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-group p-2"
          >
            <TiPlus className="text-2xl" />
          </div>
          Datos de Grupo
          <MdEdit className="text-xl text-white" />
        </div>
      </div>
      <div className="pinnacle-wrap px-8 py-8">
        <GroupFormInLine
          setIsAddFormActive={setIsAddFormActive}
          handleEditGroup={handleEditGroup}
          isAddFormActive={isAddFormActive}
          hasGroup={groupDataEmpty}
        />
      </div>
    </div>
  );
}

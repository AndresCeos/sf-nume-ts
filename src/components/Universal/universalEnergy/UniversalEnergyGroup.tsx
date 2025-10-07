import cx from 'classnames';
import _ from 'lodash';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TiPlus } from 'react-icons/ti';

import groupImg from '@/assets/group.png';

import GroupSelectionModal from '@/components/modal/GroupSelectionModal';
import useConsult from '@/hooks/useConsult';
import useEnergy from '@/hooks/useEnergy';
import Group from '@/resources/Group';
import Person from '@/resources/Person';
import { useEffect } from 'react';

type UniversalEnergyGroupProps = {
  setActive: () => void;
  selected: boolean;
};

function UniversalEnergyGroup({
  setActive, selected,
}: UniversalEnergyGroupProps) {
  const {
    activeConsultant, calculationYear,
  } = useConsult();
  const { setActiveSelection, selectedType, setSelectedType } = useEnergy();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!activeConsultant) return null;

  // Verificar si el consultante tiene GroupData
  const hasGroupData = activeConsultant?.groupData && activeConsultant.groupData.length > 0;

  // Obtener el grupo actual seleccionado
  const currentGroup = activeConsultant?.guestEnergy?.guestGroup;

  // Efecto para establecer automáticamente el grupo seleccionado como selección activa
  useEffect(() => {
    if (selectedType === 'group' && currentGroup && currentGroup.members && currentGroup.members.length > 0) {
      const mapMembers = currentGroup.members.map((member) => new Person({
        id: member.id,
        name: member.name,
        lastName: member.lastName,
        scdLastName: member.scdLastName,
        birthDate: member.date,
      }));

      const groupFromCurrent = new Group(mapMembers, currentGroup.lastInit);
      setActiveSelection(groupFromCurrent);
    }
  }, [selectedType, currentGroup, setActiveSelection]);

  // Crear instancia de Group si hay grupo seleccionado
  let group: Group | null = null;
  let day = 0;
  let month = 0;

  if (currentGroup && activeConsultant) {
    const mapMembers = currentGroup?.members?.map((member) => new Person({
      id: member.id,
      name: member.name,
      lastName: member.lastName,
      scdLastName: member.scdLastName,
      birthDate: member.date,
    }));

    if (mapMembers && mapMembers.length > 0) {
      group = new Group(mapMembers, currentGroup.lastInit);
      day = Number(new Date(currentGroup.date).getDate() || 0);
      month = Number(new Date(currentGroup.date).getMonth() || 0);
    }
  }

  const handleGroupSelect = (groupSelect: Api.GroupData) => {
    // Establecer el tipo seleccionado como 'group'
    setSelectedType('group');

    // Crear instancia de Group y establecerla como selección activa
    if (groupSelect?.members && groupSelect.members.length > 0) {
      const mapMembers = groupSelect.members.map((member) => new Person({
        id: member.id,
        name: member.name,
        lastName: member.lastName,
        scdLastName: member.scdLastName,
        birthDate: member.date,
      }));

      const groupSelected = new Group(mapMembers, groupSelect.lastInit);
      setActiveSelection(groupSelected);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <ul className={cx(
      'flex flex-col items-center',
      { 'opacity-25': !hasGroupData },
      'order-3',
    )}
    >
      <li className="mb-2">
        <img src={groupImg} width={55} height={55} alt="group_disabled" />
      </li>
      <li
        className={cx('text-center', {
          'text-main-700': !selected,
          'text-black': selected,
          'cursor-pointer': hasGroupData && currentGroup,
          'cursor-not-allowed opacity-50': !hasGroupData || !currentGroup,
        })}
      >
        <button
          type="button"
          onClick={() => {
            if (hasGroupData && currentGroup) {
              setActive();
            } else if (hasGroupData) {
              // Si hay datos pero no hay grupo seleccionado, abrir modal
              openModal();
            }
          }}
          disabled={!hasGroupData}
          className="w-full"
        >
          {_.toUpper(t('home.energy') as string)}
          <br />
          <div className="font-black">
            {_.toUpper(t('home.groupal') as string)}
          </div>
        </button>
      </li>
      <li className={cx('rounded-full bg-white w-32 h-10 flex items-center justify-center border border-gray-700 text-[13px] inner-shadow mt-3 mb-6 font-black cursor-pointer')}>
        {/* Modal de selección de grupos */}
        <button type="button" onClick={openModal} className="w-full h-full flex items-center justify-center">
          {!hasGroupData && (
            <div className="flex items-center justify-center">
              <TiPlus />
            </div>
          )}
          {hasGroupData && !currentGroup && (
            <div className="flex items-center justify-center">
              <TiPlus />
            </div>
          )}
          {hasGroupData && currentGroup && (
            <div className="flex items-center justify-center">
              {currentGroup.name || t('home.selectGroup')}
            </div>
          )}
        </button>
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {group ? group.calcPersonalDay({ day, month, year: calculationYear }) : ''}
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {group ? group.calcPersonalWeek(day, month, calculationYear) : ''}
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {group ? group.calcPersonalMonth({ day, month, year: calculationYear }) : ''}
      </li>
      <li className="rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3 font-black">
        {group ? group.calcPersonalYear(calculationYear) : ''}
      </li>

      <GroupSelectionModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        groupData={activeConsultant?.groupData || []}
        currentGroup={currentGroup || {
          id: '',
          name: '',
          description: '',
          date: '',
          members: [],
          lastInit: 0,
        }}
        onSelectGroup={handleGroupSelect}
      />
    </ul>
  );
}

export default UniversalEnergyGroup;

import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useAuth } from '@/context/AuthProvider';
import { Consultant } from '@/context/EnergyContext';
import useEnergy from '../../hooks/useEnergy';
import UniversalEnergyPerson from '../universal/universalEnergy/UniversalEnergyPerson';
import UniversalEnergyValues from '../universal/universalEnergy/UniversalEnergyValues';

function UniversalEnergy() {
  const { user: userAuth } = useAuth();
  const {
    consultants, setConsultants, selectConsultant, updateConsultant,
  } = useEnergy();

  useEffect(() => {
    const peopleToSet: Consultant[] = [];
    peopleToSet.push({
      id: uuidv4(),
      name: `${userAuth?.user?.firstName} ${userAuth?.user?.lastName}`,
      date: userAuth?.user?.birthDate as never,
      selected: true,
      order: 1,
    });

    userAuth?.guests?.forEach((guest, index) => {
      peopleToSet.push({
        id: uuidv4(),
        name: guest.name,
        date: guest.date,
        selected: false,
        order: index + 2,
      });
    });

    setConsultants(peopleToSet);
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 mt-14">
        <UniversalEnergyValues />
        {consultants.sort((a, b) => a?.order ?? 0 - Number(b?.order ?? 1)).map((person) => (
          <UniversalEnergyPerson
            key={person.id}
            person={person}
            handleUpdateGuest={updateConsultant}
            setActive={() => selectConsultant(person.id as string)}
          />
        ))}
      </div>
      {JSON.stringify(consultants.filter((consultant) => consultant.selected === true))}
    </>
  );
}

export default UniversalEnergy;

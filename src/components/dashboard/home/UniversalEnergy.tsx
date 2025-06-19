import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import UniversalEnergyPerson from '@/components/Universal/universalEnergy/UniversalEnergyPerson';
import UniversalEnergyValues from '@/components/Universal/universalEnergy/UniversalEnergyValues';
import { useAuth } from '@/context/AuthProvider';
import { Consultant } from '@/context/EnergyContext';
import useEnergy from '@/hooks/useEnergy';

function UniversalEnergy() {
  const { user: userAuth } = useAuth();
  const {
    consultants, fillConsultants, selectConsultant, updateConsultant,
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
        date: guest.date.toString(),
        selected: false,
        order: index + 2,
      });
    });

    fillConsultants(peopleToSet);
  }, []);

  return (
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
  );
}

export default UniversalEnergy;

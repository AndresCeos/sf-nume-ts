import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useAuth } from '@/context/AuthProvider';
import UniversalEnergyPerson, { EnergyPersonProps } from '../Universal/universalEnergy/UniversalEnergyPerson';
import UniversalEnergyValues from '../Universal/universalEnergy/UniversalEnergyValues';

function UniversalEnergy() {
  const { user: userAuth } = useAuth();
  const [people, setPeople] = useState<EnergyPersonProps[]>([]);

  useEffect(() => {
    const peopleToSet: EnergyPersonProps[] = [];
    peopleToSet.push({
      id: uuidv4(),
      name: `${userAuth?.user?.firstName} ${userAuth?.user?.lastName}`,
      date: userAuth?.user?.birthDate as never,
      active: true,
      order: 1,
    });

    userAuth?.guests?.forEach((guest, index) => {
      peopleToSet.push({
        id: uuidv4(),
        name: guest.name,
        date: guest.date,
        active: false,
        order: index + 2,
      });
    });

    setPeople(peopleToSet);
  }, []);

  const handleUpdateGuest = ({ id, name, date }: { id?: string, name: string, date: Date }) => {
    const peopleToSet: EnergyPersonProps[] = people.map((person) => ({ ...person, active: false }));
    if (id) {
      const personToUpdate = peopleToSet.find((person) => person.id === id);
      if (personToUpdate) {
        personToUpdate.name = name;
        personToUpdate.date = date;
        personToUpdate.active = true;
      }
    } else {
      peopleToSet.push({
        id: uuidv4(),
        name,
        date,
        active: true,
      });
    }
    setPeople(peopleToSet);
  };

  const handleSetActive = (id: string) => {
    const peopleInactive: EnergyPersonProps[] = people.filter((person) => person.id !== id).map((person) => ({ ...person, active: false }));
    const personActive = people.find((person) => person.id === id) as EnergyPersonProps;

    setPeople([...peopleInactive, { ...personActive, active: true }]);
  };

  return (
    <div className="grid grid-cols-4 mt-14">
      <UniversalEnergyValues />
      {people.sort((a, b) => a?.order ?? 0 - Number(b?.order ?? 1)).map((person) => (
        <UniversalEnergyPerson
          key={person.id}
          person={person}
          handleUpdateGuest={handleUpdateGuest}
          setActive={() => handleSetActive(person.id as string)}
        />
      ))}
    </div>
  );
}

export default UniversalEnergy;

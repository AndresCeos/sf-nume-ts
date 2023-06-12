import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useAuth } from '@/context/AuthProvider';
import UniversalEnergyPerson, { EnergyPersonProps } from '../Universal/universalEnergy/UniversalEnergyPerson';

function UniversalEnergy() {
  const { user: userAuth } = useAuth();
  const [people, setPeople] = useState<EnergyPersonProps[]>([]);

  useEffect(() => {
    people.push({
      id: uuidv4(),
      name: `${userAuth?.user?.firstName} ${userAuth?.user?.lastName}`,
      date: userAuth?.user?.birthDate as never,
      active: true,
    });

    userAuth?.guests?.forEach((guest) => {
      people.push({
        id: uuidv4(),
        name: guest.name,
        date: guest.date,
        active: false,
      });
    });
  }, [userAuth]);

  const handleAddGuest = ({ name, date }: { name: string, date: Date }) => {
    setPeople((prev) => [
      ...prev,
      {
        id: uuidv4(),
        name,
        date,
        active: false,
      },
    ]);
  };

  const handleSetActive = (id: string) => {
    const peopleInactive: EnergyPersonProps[] = people.map((person) => ({ ...person, active: false }));
    const personActive = people.find((person) => person.id === id) as EnergyPersonProps;

    setPeople([...peopleInactive, { ...personActive, active: true }]);
  };

  return (
    <div className="grid grid-cols-4 mt-24">
      {people.map((person) => (
        <UniversalEnergyPerson
          person={person}
          addGuest={handleAddGuest}
          setActive={() => handleSetActive(person.id as string)}
        />
      ))}
    </div>
  );
}

export default UniversalEnergy;

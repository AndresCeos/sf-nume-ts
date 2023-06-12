import { useAuth } from '@/context/AuthProvider';
import { v4 as uuidv4 } from 'uuid';
import UniversalEnergyPerson from '../Universal/universalEnergy/UniversalEnergyPerson';

function UniversalEnergy() {
  const { user: userAuth } = useAuth();
  const people: Api.Guest[] & { id?: string } = [];
  people.push({
    name: `${userAuth?.user?.firstName} ${userAuth?.user?.lastName}`,
    date: userAuth?.user?.birthDate as never,
  });

  userAuth?.guests?.forEach((guest) => {
    people.push({
      id: uuidv4(),
      name: guest.name,
      date: guest.date,
    });
  });

  return (
    <div className="grid grid-cols-4 mt-24">
      {people.map((person) => (
        <UniversalEnergyPerson person={person} />
      ))}
    </div>
  );
}

export default UniversalEnergy;

import { useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import UniversalEnergyPerson from '@/components/Universal/universalEnergy/UniversalEnergyPerson';
import UniversalEnergyValues from '@/components/Universal/universalEnergy/UniversalEnergyValues';
import { useAuth } from '@/context/AuthProvider';
import { EnergyConsultant } from '@/context/EnergyContext';
import useEnergy from '@/hooks/useEnergy';

function UniversalEnergy() {
  const { user: userAuth } = useAuth();
  const {
    consultants, fillConsultants, selectConsultant, updateConsultant,
  } = useEnergy();

  useEffect(() => {
    if (!userAuth) return;
    if ((consultants?.length ?? 0) > 0) return;

    const peopleToSet: EnergyConsultant[] = [];
    peopleToSet.push({
      id: uuidv4(),
      name: `${userAuth?.user?.firstName} ${userAuth?.user?.lastName}`,
      date: String(userAuth?.user?.birthDate ?? ''),
      selected: true,
      order: 1,
    });
    if (userAuth?.guests) {
      userAuth?.guests?.forEach((guest, index) => {
        peopleToSet.push({
          id: uuidv4(),
          name: guest.name,
          date: String(guest.date ?? ''),
          selected: false,
          order: index + 2,
        });
      });
    }

    fillConsultants(peopleToSet);
  }, [userAuth, consultants?.length]);

  const sortedConsultants = useMemo(
    () => (consultants || []).slice().sort((a, b) => (a?.order ?? 0) - (b?.order ?? 1)),
    [consultants],
  );
  console.log(sortedConsultants);

  return (
    <div>
      <div className="mt-14 mb-5 text-center">
        <p className="text-sm text-gray-500">
          💡 Haz clic en el nombre para editar la información
        </p>
      </div>
      <div className="grid grid-cols-4 mt-1">
        <UniversalEnergyValues />
        {sortedConsultants.length === 0 ? (
          <div className="col-span-3 p-4 text-sm text-gray-500">No hay consultores para mostrar.</div>
        ) : (
          sortedConsultants.map((person) => (
            <UniversalEnergyPerson
              key={person.id}
              person={person}
              handleUpdateGuest={updateConsultant}
              setActive={() => { if (person.id) { selectConsultant(person.id); } }}
            />
          ))
        )}
      </div>

    </div>
  );
}

export default UniversalEnergy;

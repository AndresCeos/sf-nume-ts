import { useAuth } from '@/context/AuthProvider';
import useEnergy from '@/hooks/useEnergy';
import Person from '@/resources/Person';
import TimeCircle from '../../personal/timeCircle/TimeCircle';

function EnergyTimeCircle() {
  const { activeSelection, selectedType } = useEnergy();
  const { user: userAuth } = useAuth();

  // Crear userPerson por defecto
  const userPerson = new Person({
    id: userAuth?.user.id?.toString() || '',
    name: userAuth?.user.firstName || '',
    lastName: userAuth?.user.lastName || '',
    scdLastName: userAuth?.user.scdLastName || '',
    birthDate: userAuth?.user.birthDate?.toString() || '',
  });

  // Si hay una selección activa, usarla
  if (activeSelection) {
    return (
      <div className="row-span-2 flex justify-center items-center">
        <TimeCircle consultant={activeSelection} />
      </div>
    );
  }

  // Si se seleccionó universal, mostrar mensaje
  if (selectedType === 'universal') {
    return (
      <div className="row-span-2 flex justify-center items-center">
        <div className="text-center">
          <img src="/assets/ic-universal.svg" alt="universal" className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-gray-600 text-lg font-bold">Energía Universal</p>
          <p className="text-gray-500 text-sm">Los cálculos universales no requieren círculo de tiempo</p>
        </div>
      </div>
    );
  }

  // Si no hay selección activa, mostrar userPerson por defecto
  return (
    <div className="row-span-2 flex justify-center items-center">
      <TimeCircle consultant={userPerson} />
    </div>
  );
}

export default EnergyTimeCircle;

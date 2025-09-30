import useEnergy from '@/hooks/useEnergy';
import TimeCircle from '../../personal/timeCircle/TimeCircle';

function EnergyTimeCircle() {
  const { activeSelection, selectedType } = useEnergy();

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

  // Si no hay selección, mostrar mensaje de selección
  return (
    <div className="row-span-2 flex justify-center items-center">
      <div className="text-center">
        <img src="/assets/welcome.png" alt="welcome" className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p className="text-gray-600 text-lg font-bold">Selecciona una opción</p>
        <p className="text-gray-500 text-sm">Elige Persona, Pareja o Grupo para ver el círculo de tiempo</p>
      </div>
    </div>
  );
}

export default EnergyTimeCircle;

import useEnergy from '@/hooks/useEnergy';
import Person from '@/resources/Person';
import TimeCircle from '../personal/timeCircle/TimeCircle';

function EnergyTimeCircle() {
  const { consultantSelected } = useEnergy();

  if (!consultantSelected?.id || !consultantSelected?.name || !consultantSelected?.date) return null;

  const consultant = new Person({
    id: consultantSelected.id,
    name: consultantSelected.name,
    lastName: '',
    scdLastName: '',
    birthDate: consultantSelected.date,
  });

  return (
    <div className="row-span-2 flex justify-center items-center">
      <TimeCircle consultant={consultant} />
    </div>
  );
}

export default EnergyTimeCircle;

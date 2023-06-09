import useConsult from '@/hooks/useConsult';
import Universal from '@/resources/Universal';

function TimeCircle() {
  const { consultationDate } = useConsult();

  const u = new Universal();
  const currentMonth = consultationDate.format('M');
  const currentYear = consultationDate.format('YYYY');

  return (
    <div className="relative time-circle">
      <img src="/assets/time-circle.png" className="relative" alt="Time Circle" />
      {JSON.stringify({ currentMonth, currentYear, u })}
    </div>
  );
}

export default TimeCircle;

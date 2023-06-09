import moment from 'moment';

function TimeCircle() {
  const currentMonth = moment().format('M');

  return (
    <div className="relative time-circle">
      <img src="/assets/time-circle.png" className="relative" alt="Time Circle" />
      {currentMonth}
    </div>
  );
}

export default TimeCircle;

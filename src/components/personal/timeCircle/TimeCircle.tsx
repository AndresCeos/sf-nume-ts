import Person from '@/resources/Person';
import TimeCirclePastMonths from './TimeCirclePastMonths';
import TimeCircleWeeks from './TimeCircleWeeks';

function TimeCircle({ consultant }: { consultant?: Person }) {
  return (
    <div className="relative time-circle">
      <img src="/assets/time-circle.png" className="relative" alt="Time Circle" />
      <img className="circle-tempo-arrow" src="/assets/time-circle-arrow.png" alt="" />
      <TimeCirclePastMonths />
      <span className="time-circle-year">{consultant?.calcPersonalYear()}</span>
      <TimeCircleWeeks />
    </div>
  );
}

TimeCircle.defaultProps = {
  consultant: undefined,
};

export default TimeCircle;

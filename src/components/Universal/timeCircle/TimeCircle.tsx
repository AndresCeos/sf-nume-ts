import TimeCirclePastMonths from './timeCircle/TimeCirclePastMonths';
import TimeCircleWeeks from './timeCircle/TimeCircleWeeks';

function TimeCircle() {
  return (
    <div className="relative time-circle">
      <img src="/assets/time-circle.png" className="relative" alt="Time Circle" />
      <img className="circle-tempo-arrow" src="/assets/time-circle-arrow.png" alt="" />
      <TimeCirclePastMonths />
      <span className="time-circle-year">22</span>
      <TimeCircleWeeks />
    </div>
  );
}

export default TimeCircle;

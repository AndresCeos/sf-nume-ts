import Person, { SplittedDate } from '@/resources/Person';
import lifePathImage from '../assets/life-path.jpg';
import LifePath9Years from '../lifePath/LifePath9Years';
import LifePathDialogs from '../lifePath/LifePathDialogs';
import LifePathLearningStage from '../lifePath/LifePathLearningStage';
import LifePathPersonalMonths from '../lifePath/LifePathPersonalMonths';
import LifePathPersonalWeeks from '../lifePath/LifePathPersonalWeeks';
import LifePathPersonalYears from '../lifePath/LifePathPersonalYears';
import LifePathQuarters from '../lifePath/LifePathQuarters';

export default function LifePathPDF({ consultant, date, newDate }: { consultant: Person, date: SplittedDate, newDate: Date }) {
  return {
    bg: lifePathImage,
    children:
  <>
    <LifePath9Years consultant={consultant} now={date} />
    <LifePathLearningStage consultant={consultant} now={date} />
    <LifePathPersonalYears consultant={consultant} now={date} />
    <LifePathQuarters consultant={consultant} now={date} />
    <LifePathPersonalMonths consultant={consultant} now={date} newDate={newDate} />
    <LifePathPersonalWeeks consultant={consultant} now={date} newDate={newDate} />
    <LifePathDialogs consultant={consultant} now={date} />
  </>,
  };
}

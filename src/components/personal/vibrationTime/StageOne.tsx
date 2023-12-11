import useConsult from '@/hooks/useConsult';
import { sliceIntoChunks } from '@/utils/numbers';

function StageOne() {
  const { consultant, calculationDate } = useConsult();
  if (!consultant) return null;
  const birthYear = consultant.getYearOfBirth();
  const duration = consultant.calcLifeStageDuration(1) - birthYear;
  const arr = [];
  const nineYearCycleOfBirth = consultant.getNineYearCycleStage(birthYear);
  nineYearCycleOfBirth.forEach((e) => {
    if (e < birthYear) {
      arr.push('');
    }
  });
  for (let index = 0; index <= duration; index++) {
    arr.push(birthYear + index);
  }
  const rows = sliceIntoChunks(arr, 9);
  rows.forEach((row, i) => {
    if (rows[i + 1]) {
      row.push(rows[i + 1][0]);
    }
  });
  return (
    <>
      {rows.map((years:number[], i) => years.map((year:number, j) => (
        <b className={`col-start-${j + 1} row-start-${i + 3} ${(year === calculationDate.year) ? 'text-black' : 'text-gray-300'}`}>
          {' '}
          {year}
        </b>
      )))}
    </>
  );
}
export default StageOne;

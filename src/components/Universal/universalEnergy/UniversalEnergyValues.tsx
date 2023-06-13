import useConsult from '@/hooks/useConsult';
import Universal from '@/resources/Universal';
import { formatDate } from '@/utils/constants';

function UniversalEnergyValues() {
  const { consultationDate, calculationDate, calculationYear } = useConsult();

  const u = new Universal();

  return (
    <ul className="flex flex-col items-center relative">
      <li className="mb-2">
        <img src="/assets/ic-universal.svg" alt="universal" />
      </li>
      <li className="text-center text-main-700">
        ENERGÍA
        <br />
        <div className="font-black">UNIVERSAL</div>
      </li>
      <li className="rounded-full bg-white w-32 h-10 flex items-center justify-center border border-gray-700 inner-shadow mt-3 mb-6 font-black text-[13px] text-center">
        {formatDate({ date: consultationDate.toDate(), format: 'short' })}
      </li>
      <li
        className="name-energy rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3"
        data-name="DÍA"
      >
        {u.calcUniversalDay(calculationDate)}
        {u.calcUniversalDayISK(calculationDate)}
      </li>
      <li
        className="name-energy rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3"
        data-name="SEM"
      >
        {u.calcCurrentUniversalWeek(calculationDate)}
        {u.calcCurrentUniversalWeekISK(calculationDate)}
      </li>
      <li
        className="name-energy rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3"
        data-name="MES"
      >
        {u.calcUniversalMonth(calculationDate)}
        {u.calcUniversalMonthISK(calculationDate)}
      </li>
      <li
        className="name-energy rounded-full bg-white w-10 h-10 flex items-center justify-center border border-gray-700 inner-shadow text-xl mb-3"
        data-name="AÑO"
      >
        {u.calcUniversalYear(calculationYear)}
        {u.calcUniversalYearISK(calculationYear)}
      </li>
    </ul>
  );
}

export default UniversalEnergyValues;

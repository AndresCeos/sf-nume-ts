import { capitalize } from 'lodash';

import useConsult from '@/hooks/useConsult';
import Universal from '@/resources/Universal';
import { getMonthName } from '@/utils/numbers';

type SingleMonthsProps = {
  month:number;
};

function SingleMonth({ month }:SingleMonthsProps) {
  const { consultant, calculationDate } = useConsult();
  if (!consultant) return null;
  const u = new Universal();

  const personalMonth = { ...calculationDate, month };

  const week = {
    one: (calculationDate.day >= 1 && calculationDate.day <= 7),
    two: (calculationDate.day >= 8 && calculationDate.day <= 14),
    three: (calculationDate.day >= 15 && calculationDate.day <= 21),
    four: (calculationDate.day >= 22),
  };
  const currentMonth = calculationDate.month === personalMonth.month;
  const daysInMonthSingle = consultant.getAllDaysInMonth(month, calculationDate.year);
  const daysCustomSingle = consultant.getDaysOfWeekCustom(month, calculationDate.year);

  const isToday = (day:number) => {
    const style = (day === calculationDate.day && currentMonth) && 'bg-red-80';
    return style;
  };
  const isWeekOne = (day:number) => week.one && day >= 1 && day <= 7;
  const isWeekTwo = (day:number) => week.two && day >= 8 && day <= 14;
  const isWeekThree = (day:number) => week.three && day >= 15 && day <= 21;
  const isWeekFour = (day:number) => week.four && day >= 22;

  const isCurrentMonth = (day:number) => {
    const result = (currentMonth && (isWeekOne(day) || isWeekTwo(day) || isWeekThree(day) || isWeekFour(day))) && 'bg-red-50';
    return result;
  };
  const isEvenDay = (day:number) => {
    const evenBg = (day % 2 === 0 && !currentMonth) && 'bg-gray-10';
    return evenBg;
  };

  return (
    <div className="p-6">
      <div className="grid">
        <div className="col-start-1 col-end-6 text-2xl flex justify-center bg-main text-white font-bold p-2">
          {capitalize(getMonthName(String(personalMonth.month)))}
          {' '}
          {consultant.calcPersonalMonth(personalMonth)}
          {consultant.calcPersonalMonthISK(personalMonth)}
          /
          {u.calcUniversalMonth(personalMonth)}
          {u.calcUniversalMonthISK(personalMonth)}
        </div>
        <div className="text-xl col-start-6 col-end-8 flex justify-center bg-purple-50 p-2 text-white">
          Cuatrimestre:
          {' '}
          {consultant.getQuarterMonth(personalMonth.month, personalMonth.year)}
          {consultant.getQuarterMonthISK(personalMonth.month, personalMonth.year)}
        </div>
      </div>
      <div className="grid">
        <div className="col-start-1 col-end-1 mr-6 mt-12">
          <div className={`${(week.one && currentMonth) ? 'bg-red-80 text-white font-bold' : 'bg-gray-30 text-gray-500'} h-16 border border-black   pl-1 row-start-1`}>
            1era Sem
            <br />
            <span className={`${(week.one && currentMonth) ? 'text-white' : ''}  flex justify-center font-bold text-black`}>
              {consultant.calcSelectPersonalWeek(1, personalMonth)}
              {consultant.calcSelectPersonalWeekISK(1, personalMonth)}
              /
              {u.calcUniversalWeek(1, personalMonth)}
              {u.calcUniversalWeekISK(1, personalMonth)}
            </span>
          </div>
          <div className={`${(week.two && currentMonth) ? 'bg-red-80 text-white font-bold' : 'bg-gray-30 text-gray-500'} h-16 border border-black  text-gray-500 pl-1 row-start-2`}>
            2da Sem
            <br />
            <span className={` ${(week.two && currentMonth) ? 'text-white' : ''}  flex justify-center font-bold text-black`}>
              {consultant.calcSelectPersonalWeek(2, personalMonth)}
              {consultant.calcSelectPersonalWeekISK(2, personalMonth)}
              /
              {u.calcUniversalWeek(2, personalMonth)}
              {u.calcUniversalWeekISK(2, personalMonth)}
            </span>
          </div>
          <div className={` ${(week.three && currentMonth) ? 'bg-red-80 text-white font-bold' : 'bg-gray-30 text-gray-500'} h-16 border border-black  text-gray-500 pl-1 row-start-3`}>
            3era Sem
            <br />
            <span className={` ${(week.three && currentMonth) ? 'text-white' : ''}  flex justify-center font-bold text-black`}>
              {consultant.calcSelectPersonalWeek(3, personalMonth)}
              {consultant.calcSelectPersonalWeekISK(3, personalMonth)}
              /
              {u.calcUniversalWeek(3, personalMonth)}
              {u.calcUniversalWeekISK(3, personalMonth)}
            </span>
          </div>
          <div className={` ${(week.four && currentMonth) ? 'bg-red-80 text-white font-bold' : 'bg-gray-30 text-gray-500'} h-16 border border-black  text-gray-500 pl-1 row-start-4`}>
            4ta Sem
            <br />
            <span className={` ${(week.four && currentMonth) ? 'text-white' : ''}  flex justify-center font-bold text-black`}>
              {consultant.calcSelectPersonalWeek(4, personalMonth)}
              {consultant.calcSelectPersonalWeekISK(4, personalMonth)}
              /
              {u.calcUniversalWeek(4, personalMonth)}
              {u.calcUniversalWeekISK(4, personalMonth)}
            </span>
          </div>
          {(daysInMonthSingle.length > 28) ? (
            <div className={` ${(week.four && currentMonth) ? 'bg-red-80' : 'bg-gray-30 text-gray-500'} h-16 border border-black  text-gray-500 pl-1 row-start-5`}>
              4ta Sem
              <br />
              <span className={` ${(week.four && currentMonth) ? 'text-white' : ''}  flex justify-center font-bold text-black`}>
                {consultant.calcSelectPersonalWeek(4, personalMonth)}
                {consultant.calcSelectPersonalWeekISK(4, personalMonth)}
                /
                {u.calcUniversalWeek(4, personalMonth)}
                {u.calcUniversalWeekISK(4, personalMonth)}
              </span>
            </div>
          ) : ''}
        </div>
        <div className="col-start-2 col-end-8">
          <div className="h-12 grid grid-cols-7">
            {daysCustomSingle.map((d) => <div key={d} className="bg-gray-30  p-3 border border-black px-1 text-center text-gray-500 ">{d[0]}</div>)}
          </div>
          <div className=" grid grid-cols-7 ">
            {daysInMonthSingle.map((day) => (
              <div
                key={day}
                className={`${isToday(day)} ${isCurrentMonth(day)} ${currentMonth && 'bg-gold-10'} ${isEvenDay(day)} h-16 border border-black p-1 text-gray-500`}
              >
                {day}
                <br />
                <span className="text-xl flex justify-center text-black font-bold">
                  {consultant.calcPersonalDay({ ...calculationDate, month, day })}
                  {consultant.calcPersonalDayISK({ ...calculationDate, month, day })}
                  /
                  {u.calcUniversalDay({ ...calculationDate, month, day })}
                  {u.calcUniversalDayISK({ ...calculationDate, month, day })}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
export default SingleMonth;

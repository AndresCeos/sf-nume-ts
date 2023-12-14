/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React from 'react';

import useConsult from '@/hooks/useConsult';
import { generateUniqueKey } from '@/utils/numbers';
import CurrentQuarterFont from './CurrentQuarterFont';
import CustomMonths from './CustomMonths';

function QuarterPerYear() {
  const { consultant, calculationDate } = useConsult();
  if (!consultant) return null;
  const listOfMonths = consultant.getCustomMonths();
  const nineYearCycle = consultant.getNineYearCycle(calculationDate);
  console.log(nineYearCycle);
  return (
    <div id="destinityTable" className="flex overflow-x-auto w-full border border-solid border-gray-300">
      <div className="grid grid-cols-11 grid-rows-14 w-full mx-4 my-8 border border-solid border-gray-500 ">
        <div className="col-start-1 col-end-3 row-start-1  flex justify-start items-center bg-main p-1 text-white font-bold border border-gray-500">Año calendario</div>
        <div className="col-start-1 col-end-3  row-start-2 flex justify-start items-center p-1 bg-purple-30 font-bold border border-gray-500">Año personal</div>
        <CurrentQuarterFont />
        {listOfMonths.map((data, index) => {
          const isJanuaryAndBefore = data === 'Enero' && index < 12;
          let rowStart = '';
          if (isJanuaryAndBefore) {
            rowStart = index === 0 ? 'row-start-14' : `row-start-${index + 2}`;
          }
          const bgClass = index % 2 === 0 ? 'bg-gray-300' : 'bg-gray-100';

          return (
            <React.Fragment key={generateUniqueKey()}>

              <div key={data} className={`${bgClass} col-start-1 col-end-3 row-start-${index + 3} flex justify-start items-center border border-gray-500 p-1`}>
                {data}
              </div>
              {isJanuaryAndBefore && (
              <div className={`col-start-1 ${rowStart}  border-b-4 border-yellow-300 col-span-full`} />
              )}
            </React.Fragment>
          );
        })}
        {nineYearCycle.map((year:number, i:number) => (
          <CustomMonths year={year} i={i} />
        ))}
      </div>
    </div>
  );
}
export default QuarterPerYear;

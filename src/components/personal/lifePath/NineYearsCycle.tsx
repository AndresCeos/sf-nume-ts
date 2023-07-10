import { useTranslation } from 'react-i18next';

import useConsult from '@/hooks/useConsult';
import cyclePhrases from '@/resources/CyclePhrases';

function NineYearsCycle() {
  const { consultant, consultationDate } = useConsult();
  const { i18n, t } = useTranslation();
  const { language } = i18n;

  if (!consultant) return null;

  return (
    <div className="grid grid-cols-16 text-center text-gray-500 px-8 py-8">
      <div className="col-start-3 col-span-full row-start-2 row-end-6 relative">
        <div className="absolute z-10 centered-axis-x w-full">
          <img src="/assets/life-path/arrow.svg" alt="arrow_bk" className="w-full" />
        </div>
      </div>
      <div className="col-start-1 col-span-2 row-start-2">{consultationDate.year()}</div>
      <div className="col-start-1 col-span-2 row-start-3 h-10 bg-red flex justify-center items-center text-black text-xl font-bold rounded-md border-4 border-red">
        {t('lifePath.nineYearsCycle.yearX', { year: consultant.calcPersonalYear(consultationDate.year()) })}
      </div>
      <div className="col-start-1 col-span-2 row-start-5 h-9 arrow-down-cycle" />
      <div className="col-start-1 col-span-2 row-start-6 text-13 font-bold">
        {cyclePhrases[language as never][consultant.calcPersonalYear(consultationDate.year())][0]}
        <br />
        {cyclePhrases[language as never][consultant.calcPersonalYear(consultationDate.year())][1]}
        <br />
        {cyclePhrases[language as never][consultant.calcPersonalYear(consultationDate.year())][2]}
      </div>
      {(consultationDate.year() - 27 > consultant.getYearOfBirth())
        && (
          <>
            <div className="col-start-4 col-span-2 row-start-2 text-13 font-bold">{consultationDate.year() - 27}</div>
            <div className="col-start-4 col-span-2 row-start-3 relative">
              <div className="absolute z-10 centered-axis-x">
                <div className="w-10 h-10 text-xl font-black text-black flex justify-center items-center bg-red border border-red rounded-full inner-shadow">
                  {consultant.calcPersonalYear(consultationDate.year())}
                </div>
              </div>
            </div>
            <div className="col-start-4 col-span-2 row-start-5 h-9 arrow-down-line" />
            <div className="col-start-4 col-span-2 row-start-6 h-9 arrow-down-cycle" />
            <div className="col-start-4 col-span-2 row-start-7 text-13 font-bold">
              <div className="col-start-7 col-span-2 row-start-6 text-13 font-bold">
                {cyclePhrases[language as never][consultant.calcPersonalYear(consultationDate.year())][3]}
              </div>
            </div>
            <div className="col-start-6 row-start-1 text-13 font-medium">
              {t('lifePath.nineYearsCycle.plusNineYears')}
            </div>
            <div className="col-start-6 row-start-2 flex items-center justify-center">
              <img src="/assets/life-path/arrow-next.svg" alt="green arrow" />
            </div>
          </>
        )}

      {(consultationDate.year() - 18 > consultant.getYearOfBirth())
        && (
          <>
            <div className="col-start-7 col-span-2 row-start-2 text-13 font-bold">{consultationDate.year() - 18}</div>
            <div className="col-start-7 col-span-2 row-start-3 relative">
              <div className="absolute z-10 centered-axis-x">
                <div className="w-10 h-10 text-xl font-black text-black flex justify-center items-center bg-red border border-red rounded-full inner-shadow">
                  {consultant.calcPersonalYear(consultationDate.year())}
                </div>
              </div>
            </div>
            <div className="col-start-7 col-span-2 row-start-5 h-9 arrow-down-cycle" />
            <div className="col-start-7 col-span-2 row-start-6 text-13 font-bold">
              {cyclePhrases[language as never][consultant.calcPersonalYear(consultationDate.year())][4]}
            </div>
            <div className="col-start-9 row-start-1 text-13 font-medium">
              {t('lifePath.nineYearsCycle.plusNineYears')}
            </div>
            <div className="col-start-9 row-start-2 flex items-center justify-center">
              <img src="/assets/life-path/arrow-next.svg" alt="green arrow" />
            </div>
          </>
        )}

      {(consultationDate.year() - 9 > consultant.getYearOfBirth())
        && (
          <>
            <div className="col-start-10 col-span-2 row-start-2 text-13 font-bold">{consultationDate.year() - 9}</div>
            <div className="col-start-10 col-span-2 row-start-3 relative">
              <div className="absolute z-10 centered-axis-x">
                <div className="w-10 h-10 text-xl font-black text-black flex justify-center items-center bg-red border border-red rounded-full inner-shadow">
                  {consultant.calcPersonalYear(consultationDate.year())}
                </div>
              </div>
            </div>
            <div className="col-start-10 col-span-2 row-start-5 h-9 arrow-down-line" />
            <div className="col-start-10 col-span-2 row-start-6 h-9 arrow-down-cycle" />
            <div className="col-start-10 col-span-2 row-start-7 text-13 font-bold">
              {cyclePhrases[language as never][consultant.calcPersonalYear(consultationDate.year())][5]}
            </div>
            <div className="col-start-12 row-start-1 text-13 font-medium">
              {t('lifePath.nineYearsCycle.plusNineYears')}
            </div>
            <div className="col-start-12 row-start-2 flex items-center justify-center">
              <img src="/assets/life-path/arrow-next.svg" alt="green arrow" />
            </div>
          </>
        )}

      <div className="col-start-13 col-span-2 row-start-2 text-13 font-bold z-10">{consultationDate.year()}</div>
      <div className="col-start-13 col-span-2 row-start-3 relative">
        <div className="absolute z-10 centered-axis-x">
          <div className="w-10 h-10 text-xl font-black text-black flex justify-center items-center bg-red border border-red rounded-full inner-shadow">
            {consultant.calcPersonalYear(consultationDate.year())}
          </div>
        </div>
      </div>
      <div className="col-start-13 col-span-2 row-start-5 h-9 arrow-down-cycle" />
      <div className="col-start-13 col-span-2 row-start-6 text-13 font-bold">
        {cyclePhrases[language as never][consultant.calcPersonalYear(consultationDate.year())][6]}
      </div>

    </div>
  );
}

export default NineYearsCycle;

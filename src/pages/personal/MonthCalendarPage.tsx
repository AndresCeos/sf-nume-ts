import { useTranslation } from 'react-i18next';

import { TiPlus } from 'react-icons/ti';

import CircleNumber from '@/components/CircleNumber';
import NoConsultantSelected from '@/components/NoConsultantSelected';
import SingleMonth from '@/components/personal/annualCalendar/SingleMonth';

import useConsult from '@/hooks/useConsult';
import Universal from '@/resources/Universal';

export default function MonthCalendarPage() {
  const { t } = useTranslation();
  const { consultant, calculationDate } = useConsult();
  if (!consultant) return (<NoConsultantSelected />);
  const u = new Universal();
  return (
    <div className="page-content bg-home-background bg-cover pb-10">
      <div className="grid grid-cols-12 mt-8 mx-14 gap-6 pb-9 pt-10">
        <div className="col-span-12">
          <div className="bg-black text-white text-base font-bold h-8 flex justify-start items-center rounded-tl-2xl rounded-tr-2xl">
            <div className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-green-600 p-2">
              <TiPlus className="text-2xl" />
            </div>
            {t('monthCalendar.title')}
            {' '}
            {calculationDate.year}
          </div>
          <div className="pinnacle-wrap gird grid-cols-2 px-4 py-8 w-full">
            <div className="col-start-1 row-start-1 col-end-3 flex items-center justify-start">
              <div className="text-xl text-black font-bold px-2">
                {calculationDate.year}
                :
              </div>
              <div className="text-sm text-gray-500 px-2 font-bold">
                {t('monthCalendar.personalYear')}
              </div>
              <div className=" px-2">
                <CircleNumber size="sm" appearance="purple-30" border="main">
                  {consultant.calcPersonalYear(calculationDate.year)}
                  {consultant.calcPersonalYearISK(calculationDate.year)}
                </CircleNumber>
              </div>
              <div className="text-black font-bold text-xl px-2"> / </div>
              <div className=" px-2">
                <CircleNumber size="sm" appearance="main" border="main">
                  {u.calcUniversalYear(calculationDate.year)}
                  {u.calcUniversalYearISK(calculationDate.year)}
                </CircleNumber>
              </div>
              <div className="text-sm text-gray-500 px-2 font-bold">
                {t('monthCalendar.universalYear')}
              </div>
            </div>
            <div className="row-start-2 col-start-1 col-end-3">
              <SingleMonth
                month={calculationDate.month}
                showMonthSelector
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

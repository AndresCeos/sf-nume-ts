import { useTranslation } from 'react-i18next';

import NoConsultantSelected from '@/components/NoConsultantSelected';
import SectionTitle from '@/components/SectionTitle';
import ActiveEnergy from '@/components/personal/vibrationTime/ActiveEnergy';
import AnnualReturn from '@/components/personal/vibrationTime/AnnualReturn';
import NineYearsCycle from '@/components/personal/vibrationTime/NineYearsCycle';
import QuarterPerMonth from '@/components/personal/vibrationTime/QuarterPerMonth';
import QuarterPerYear from '@/components/personal/vibrationTime/QuarterPerYear';
import useConsult from '@/hooks/useConsult';

function VibrationTimePage() {
  const { consultant, calculationDate } = useConsult();
  if (!consultant) return (<NoConsultantSelected />);
  const { t } = useTranslation();
  const annualReturnCurrent = consultant.annualReturn(calculationDate);
  const annualReturnLastYear = consultant.annualReturn({ ...calculationDate, year: calculationDate.year - 1 });
  const annualReturnNextYear = consultant.annualReturn({ ...calculationDate, year: calculationDate.year + 1 });

  return (
    <div className="page-content bg-home-background bg-cover">
      <div className="grid grid-cols-12 mt-8 mx-14 pb-8 gap-4">
        <div className="col-span-8">
          <SectionTitle title={t('vibrationTime.energy.energy')} color="bg-green-s" />
          <div className="section-wrap px-2 py-7">
            <ActiveEnergy />
          </div>
        </div>
        <div className="col-span-4 row-span-2 h-full">
          <SectionTitle title={t('vibrationTime.quarterMonth.quarterMonth')} color="bg-green-s" />
          <div className="section-wrap px-2 py-7">
            <QuarterPerMonth />
          </div>
        </div>
        <div className="col-span-8">
          <SectionTitle title={t('vibrationTime.nineYearsCycle.nineYearsCycle')} color="bg-green-s" />
          <div className="section-wrap px-2 py-7">
            <NineYearsCycle />
          </div>
        </div>
        <div className="col-span-full">
          <SectionTitle title={t('vibrationTime.quarterYear.quarterYear')} color="bg-green-s" />
          <div className="section-wrap px-2 p-7">
            <QuarterPerYear />
          </div>
        </div>
        <div className="col-span-12">
          <SectionTitle title={t('vibrationTime.annualReturns.annualReturns')} color="bg-green-s" />
          <div className="section-wrap px-2">
            <div className="grid grid-cols-3">
              <div className="col-start-1 border-r border-gray-500 px-4 py-8"><AnnualReturn size="xl" annualReturn={annualReturnLastYear} /></div>
              <div className="col-start-2 border-r border-gray-500 px-4 py-8 bg-active-radial"><AnnualReturn size="xl" annualReturn={annualReturnCurrent} current months /></div>
              <div className="col-start-3 border-r border-gray-500 px-4 py-8"><AnnualReturn size="xl" annualReturn={annualReturnNextYear} /></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
export default VibrationTimePage;

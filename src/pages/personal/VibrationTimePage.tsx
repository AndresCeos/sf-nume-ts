import { useTranslation } from 'react-i18next';

import NoConsultantSelected from '@/components/NoConsultantSelected';
import SectionTitle from '@/components/SectionTitle';
import ActiveEnergy from '@/components/personal/vibrationTime/ActiveEnergy';
import QuarterPerMonth from '@/components/personal/vibrationTime/QuarterPerMonth';
import useConsult from '@/hooks/useConsult';

function VibrationTimePage() {
  const { consultant } = useConsult();
  if (!consultant) return (<NoConsultantSelected />);
  const { t } = useTranslation();

  return (
    <div className="page-content bg-home-background bg-cover">
      <div className="grid grid-cols-12 mt-8 mx-14 gap-4">
        <div className="col-span-8">
          <SectionTitle title={t('vibrationTime.energy.energy')} color="bg-green-s" />
          <div className="section-wrap px-2 py-7">
            <ActiveEnergy />
          </div>
        </div>
        <div className="col-span-4">
          <SectionTitle title={t('vibrationTime.quarterMonth.quarterMonth')} color="bg-green-s" />
          <div className="section-wrap px-2 py-7">
            <QuarterPerMonth />
          </div>
        </div>
      </div>
    </div>
  );
}
export default VibrationTimePage;

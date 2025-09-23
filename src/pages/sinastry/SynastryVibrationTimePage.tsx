import NoConsultantSelected from '@/components/NoConsultantSelected';
import SynastryActiveEnergy from '@/components/partners/vibrationTime/SynastryActiveEnergy';
import SynastryNineYearsCycle from '@/components/partners/vibrationTime/SynastryNineYearsCycle';
import SynastryQuarterPerMonth from '@/components/partners/vibrationTime/SynastryQuarterPerMonth';
import SynastryQuarterPerYear from '@/components/partners/vibrationTime/SynastryQuarterPerYear';
import SynastryTimeCurve from '@/components/partners/vibrationTime/SynastryTimeCurve';
import SectionTitle from '@/components/SectionTitle';
import SelectPartner from '@/components/sinastry/SelectPartner';
import { ConsultContext } from '@/context/ConsultContext';
import Synastry from '@/resources/Synastry';
import { t } from 'i18next';
import { useContext } from 'react';

export default function SynastryVibrationTimePage() {
  const {
    consultant, activePartnerData, selectedPartnersAsPersons,
  } = useContext(ConsultContext);

  if (!consultant) return (<NoConsultantSelected />);

  if (!activePartnerData || !selectedPartnersAsPersons || selectedPartnersAsPersons.length < 2) {
    return (
      <div className="page-content bg-home-background bg-cover pb-10">
        <SelectPartner />
        <div className="col-span-12 text-center mt-8">
          <strong>Selecciona un grupo de parejas con al menos 2 miembros para ver la sinastría</strong>
        </div>
      </div>
    );
  }

  const partner1 = selectedPartnersAsPersons[0];
  const partner2 = selectedPartnersAsPersons[1];

  const synastry = new Synastry(partner1, partner2);
  return (
    <div className="page-content bg-cover">
      <SelectPartner />
      <div className="grid grid-cols-11 mt-8 gap-6 pb-9 pt-10">
        <div className="col-span-8">

          <SectionTitle title={t('vibrationTime.energy.energy')} color="bg-red-day" />
          <div className="section-wrap px-2 py-7">
            <SynastryActiveEnergy synastry={synastry} />
          </div>
        </div>
        <div className="col-span-4 row-span-2 h-full">

          <SectionTitle title={t('vibrationTime.quarterMonth.quarterMonth')} color="bg-red-day" />

          <div className="section-wrap px-2 py-7">
            <SynastryQuarterPerMonth synastry={synastry} />
          </div>
        </div>
        <div className="col-span-8">

          <SectionTitle title={t('vibrationTime.nineYearsCycle.nineYearsCycle')} color="bg-red-day" />

          <div className="section-wrap px-2 py-7">
            <SynastryNineYearsCycle synastry={synastry} />
          </div>
        </div>
        <div className="col-span-full">

          <SectionTitle title={t('vibrationTime.quarterYear.quarterYear')} color="bg-red-day" />

          <div className="section-wrap px-2 p-7">
            <SynastryQuarterPerYear synastry={synastry} />
          </div>
        </div>
        <div className="col-span-12">

          <SectionTitle title={t('vibrationTime.annualReturns.annualReturns')} color="bg-red-day" />

          <div className="section-wrap px-2">
            <SynastryTimeCurve isPartner synastry={synastry} />
          </div>
        </div>

      </div>
    </div>
  );
}

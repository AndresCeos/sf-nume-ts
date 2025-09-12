import SelectGroup from '@/components/group/SelectGroup';
import GroupHierarchyLine from '@/components/group/timeVibration/GroupierarcyLine';
import NoConsultantSelected from '@/components/NoConsultantSelected';
import SynastryActiveEnergy from '@/components/partners/vibrationTime/SynastryActiveEnergy';
import SynastryNineYearsCycle from '@/components/partners/vibrationTime/SynastryNineYearsCycle';
import SynastryQuarterPerMonth from '@/components/partners/vibrationTime/SynastryQuarterPerMonth';
import SynastryQuarterPerYear from '@/components/partners/vibrationTime/SynastryQuarterPerYear';
import SynastryTimeCurve from '@/components/partners/vibrationTime/SynastryTimeCurve';
import SectionTitle from '@/components/SectionTitle';
import { ConsultContext } from '@/context/ConsultContext';
import Group from '@/resources/Group';
import { t } from 'i18next';
import { useContext } from 'react';

export default function GroupVibrationTimePage() {
  const {
    consultant, activeGroup, selectedGroup,
  } = useContext(ConsultContext);

  if (!consultant) return (<NoConsultantSelected />);

  if (!activeGroup) {
    return (
      <div className="page-content bg-home-background bg-cover pb-10 px-4 mx-auto">
        <SelectGroup />
        <div className="mx-auto px-5 py-6">
          <div className="text-center bg-white rounded-lg p-8 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">No hay grupo seleccionado</h3>
            <p className="text-gray-600">Por favor, selecciona o crea un grupo para ver la información de pinnacle.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedGroup || selectedGroup.length === 0) {
    return (
      <div className="page-content bg-home-background bg-cover pb-10 px-4 mx-auto">
        <SelectGroup />
        <div className="mx-auto px-5 py-6">
          <div className="text-center bg-white rounded-lg p-8 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">No hay miembros en el grupo</h3>
            <p className="text-gray-600">
              El grupo &quot;
              {activeGroup.name}
              &quot; no tiene miembros. Agrega miembros para ver la información de pinnacle.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const groupPerson = new Group(selectedGroup, activeGroup.lastInit);

  return (
    <div className="page-content bg-home-background bg-cover">
      <SelectGroup />
      <div className="grid grid-cols-11 mt-8 mx-14 gap-6 pb-9 pt-10">
        <div className="col-span-8">
          <SectionTitle title={t('vibrationTime.energy.energy')} color="bg-green-s" />
          <div className="section-wrap px-2 py-7">
            <SynastryActiveEnergy synastry={groupPerson} />
          </div>
        </div>
        <div className="col-span-4 row-span-2 h-full">
          <SectionTitle title={t('vibrationTime.quarterMonth.quarterMonth')} color="bg-green-s" />
          <div className="section-wrap px-2 py-7">
            <SynastryQuarterPerMonth synastry={groupPerson} />
          </div>
        </div>
        <div className="col-span-8">
          <SectionTitle title={t('vibrationTime.nineYearsCycle.nineYearsCycle')} color="bg-green-s" />
          <div className="section-wrap px-2 py-7">
            <SynastryNineYearsCycle synastry={groupPerson} />
          </div>
        </div>
        <div className="col-span-full">
          <SectionTitle title={t('vibrationTime.quarterYear.quarterYear')} color="bg-green-s" />
          <div className="section-wrap px-2 p-7">
            <SynastryQuarterPerYear synastry={groupPerson} />
          </div>
        </div>
        <div className="col-span-12">
          <SectionTitle title={t('vibrationTime.annualReturns.annualReturns')} color="bg-green-s" />
          <div className="section-wrap px-2">
            <SynastryTimeCurve isPartner synastry={groupPerson} />
          </div>
        </div>
        <div className="col-span-12">
          <SectionTitle title={t('vibrationTime.annualReturns.annualReturns')} color="bg-green-s" />
          <div className="section-wrap px-2">
            <GroupHierarchyLine groupConsult={groupPerson} />
          </div>
        </div>

      </div>
    </div>
  );
}

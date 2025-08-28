import {
  useCallback, useContext,
  useState,
} from 'react';
import { TiPlus } from 'react-icons/ti';

import NoConsultantSelected from '@/components/NoConsultantSelected';
import MetricsGrid from '@/components/partners/MetricsGrid';
import PinnacleComponent from '@/components/partners/Pinnacle/Pinnacle';
import AnnualReturn from '@/components/personal/pinnacle/AnnualReturn';
import Pinnacle from '@/components/personal/pinnacle/Pinnacle';
import SelectPartner from '@/components/sinastry/SelectPartner';
import WrapTitle from '@/components/WrapTitle';
import { ConsultContext } from '@/context/ConsultContext';
import Synastry from '@/resources/Synastry';
import Person from '@/resources/Person';

// Types
interface CheckboxState {
  checkP1: boolean;
  checkN1: boolean;
  checkP2: boolean;
  checkN2: boolean;
  checkP: boolean;
  checkN: boolean;
}

interface SynastryMetrics {
  name: string;
  soul: string;
  expression: string;
  maturity: string;
}

export default function SynastryPinnaclePage() {
  const { consultant, activePartnerData, calculationDate } = useContext(ConsultContext);

  const [checkboxState, setCheckboxState] = useState<CheckboxState>({
    checkP1: false,
    checkN1: false,
    checkP2: false,
    checkN2: false,
    checkP: false,
    checkN: false,
  });

  // Toggle functions
  const createToggle = useCallback((key: keyof CheckboxState) => () => {
    setCheckboxState((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const toggles = {
    checkPinacle: createToggle('checkP'),
    checkName: createToggle('checkN'),
    checkPinacle1: createToggle('checkP1'),
    checkName1: createToggle('checkN1'),
    checkPinacle2: createToggle('checkP2'),
    checkName2: createToggle('checkN2'),
  };

  // Early returns
  if (!consultant) {
    return <NoConsultantSelected />;
  }

  if (!activePartnerData || !activePartnerData.partner || activePartnerData.partner.length < 2) {
    return (
      <div className="page-content bg-home-background bg-cover pb-10">
        <SelectPartner />
        <div className="col-span-12 text-center mt-8">
          <strong>Selecciona un grupo de parejas con al menos 2 miembros para ver la sinastría</strong>
        </div>
      </div>
    );
  }

  // Create Person objects from the partner group data
  const partner1 = new Person({
    id: activePartnerData.partner[0].id,
    name: activePartnerData.partner[0].names,
    lastName: activePartnerData.partner[0].lastName,
    scdLastName: activePartnerData.partner[0].scdLastName,
    birthDate: activePartnerData.partner[0].date,
    yearMet: activePartnerData.yearMeet,
  });

  const partner2 = new Person({
    id: activePartnerData.partner[1].id,
    name: activePartnerData.partner[1].names,
    lastName: activePartnerData.partner[1].lastName,
    scdLastName: activePartnerData.partner[1].scdLastName,
    birthDate: activePartnerData.partner[1].date,
    yearMet: activePartnerData.yearMeet,
  });

  // Create synastry instance between the two partners (not consultant)
  const synastry = new Synastry(partner1, partner2);

  // Calculate annual returns for both partners and synastry
  const annualReturns = {
    partner1: partner1.annualReturn(calculationDate),
    partner2: partner2.annualReturn(calculationDate),
    synastry: synastry.annualReturn(calculationDate.year),
  };

  // Calculate synastry metrics directly
  const synastryMetrics: SynastryMetrics = {
    name: checkboxState.checkN
      ? `${synastry.getNameCheck()}${synastry.calcNameISK()}`
      : `${synastry.calcName()}${synastry.calcNameISK()}`,
    soul: checkboxState.checkN
      ? `${synastry.getSoulCheck()}${synastry.calcSoulNumberISK()}`
      : `${synastry.calcSoulNumber()}${synastry.calcSoulNumberISK()}`,
    expression: checkboxState.checkN
      ? `${synastry.getExpressionSoulCheck()}${synastry.calcSoulExpressionISK()}`
      : `${synastry.calcSoulExpression()}${synastry.calcSoulExpressionISK()}`,
    maturity: `${synastry.calcMaturity()}${synastry.calcMaturityISK()}`,
  };

  // Calculate partner1 metrics directly
  const partner1Metrics: SynastryMetrics = {
    name: checkboxState.checkN1
      ? `${partner1.getNameCheck()}${partner1.calcNameISK()}`
      : `${partner1.calcName()}${partner1.calcNameISK()}`,
    soul: checkboxState.checkN1
      ? `${partner1.getSoulCheck()}${partner1.calcSoulNumberISK()}`
      : `${partner1.calcSoulNumber()}${partner1.calcSoulNumberISK()}`,
    expression: checkboxState.checkN1
      ? `${partner1.getExpressionSoulCheck()}${partner1.calcSoulExpressionISK()}`
      : `${partner1.calcSoulExpression()}${partner1.calcSoulExpressionISK()}`,
    maturity: `${partner1.calcMaturity()}${partner1.calcMaturityISK()}`,
  };

  // Calculate partner2 metrics directly
  const partner2Metrics: SynastryMetrics = {
    name: checkboxState.checkN2
      ? `${partner2.getNameCheck()}${partner2.calcNameISK()}`
      : `${partner2.calcName()}${partner2.calcNameISK()}`,
    soul: checkboxState.checkN2
      ? `${partner2.getSoulCheck()}${partner2.calcSoulNumberISK()}`
      : `${partner2.calcSoulNumber()}${partner2.calcSoulNumberISK()}`,
    expression: checkboxState.checkN2
      ? `${partner2.getExpressionSoulCheck()}${partner2.calcSoulExpressionISK()}`
      : `${partner2.calcSoulExpression()}${partner2.calcSoulExpressionISK()}`,
    maturity: `${partner2.calcMaturity()}${partner2.calcMaturityISK()}`,
  };

  return (
    <div className="page-content bg-home-background bg-cover pb-10">
      <SelectPartner />

      <div className="grid grid-cols-12 mx-14 gap-6 mt-8 pt-10">
        {/* Synastry Metrics */}
        <div className="col-span-4 mb-1">
          <WrapTitle
            title="Nombre de Pareja"
            color="bg-blue"
            button={{
              handle: toggles.checkName,
              state: checkboxState.checkN,
              text: checkboxState.checkN ? 'Normal' : 'Comprobación',
            }}
          />
          <div className="pinnacle-wrap px-5 py-4 bg-active-radial shadow-sm">
            <MetricsGrid metrics={synastryMetrics} />
          </div>
        </div>

        {/* Partner 1 Metrics */}
        <div className="col-span-4 mb-1">
          <WrapTitle
            title={`Nombre: ${partner1.nameView}`}
            color="bg-blue"
            button={{
              handle: toggles.checkName1,
              state: checkboxState.checkN1,
              text: checkboxState.checkN1 ? 'Normal' : 'Comprobación',
            }}
          />
          <div className="pinnacle-wrap px-5 py-4 bg-white shadow-sm">
            <MetricsGrid metrics={partner1Metrics} />
          </div>
        </div>

        {/* Partner 2 Metrics */}
        <div className="col-span-4 mb-1">
          <WrapTitle
            title={`Nombre: ${partner2.nameView}`}
            color="bg-blue"
            button={{
              handle: toggles.checkName2,
              state: checkboxState.checkN2,
              text: checkboxState.checkN2 ? 'Normal' : 'Comprobación',
            }}
          />
          <div className="pinnacle-wrap px-5 py-4 bg-white shadow-sm">
            <MetricsGrid metrics={partner2Metrics} />
          </div>
        </div>

        {/* Pinnacles */}
        <div className="col-span-4 mb-1">
          <WrapTitle
            title="Pináculo de Pareja"
            color="bg-blue"
            button={{
              text: checkboxState.checkP1 ? 'Normal' : 'Comprobación',
              handle: toggles.checkPinacle1,
              state: checkboxState.checkP1,
            }}
          />
          <div className="pinnacle-wrap px-5 py-4 bg-active-radial shadow-sm">
            <PinnacleComponent entity={synastry} isVerificationActive={checkboxState.checkP1} size="sm" />
          </div>
        </div>

        <div className="col-span-4 mb-1">
          <WrapTitle
            title={`Pináculo: ${partner1.nameView}`}
            color="bg-blue"
            button={{
              text: checkboxState.checkP2 ? 'Normal' : 'Comprobación',
              handle: toggles.checkPinacle2,
              state: checkboxState.checkP2,
            }}
          />
          <div className="pinnacle-wrap px-5 py-4 shadow-sm">
            <PinnacleComponent entity={partner1} isVerificationActive={checkboxState.checkP2} size="sm" />
          </div>
        </div>

        <div className="col-span-4 mb-1">
          <WrapTitle
            title={`Pináculo: ${partner2.nameView}`}
            color="bg-blue"
            button={{
              text: checkboxState.checkP ? 'Normal' : 'Comprobación',
              handle: toggles.checkPinacle,
              state: checkboxState.checkP,
            }}
          />
          <div className="pinnacle-wrap px-5 py-4 shadow-sm">
            <PinnacleComponent entity={partner2} isVerificationActive={checkboxState.checkP} size="sm" />
          </div>
        </div>

        {/* Annual Returns */}
        <div className="col-span-4 mb-1">
          <div className="bg-black text-white text-base font-bold h-8 flex items-center justify-between rounded-tl-2xl rounded-tr-2xl">
            <div className="flex items-center pl-8">
              Retorno de Pareja
            </div>
          </div>
          <div className="pinnacle-wrap px-5 py-4 bg-active-radial shadow-sm">
            <AnnualReturn annualReturn={annualReturns.synastry} current months size="xs" />
          </div>
        </div>

        <div className="col-span-4 mb-1">
          <div className="bg-black text-white text-base font-bold h-8 flex items-center justify-between rounded-tl-2xl rounded-tr-2xl">
            <div className="flex items-center">
              <div className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-blue p-2">
                <TiPlus className="text-2xl" />
              </div>
              Pináculo:
              {' '}
              {partner1.nameView}
            </div>
          </div>
          <div className="pinnacle-wrap px-5 py-4">
            <AnnualReturn annualReturn={annualReturns.partner1} current months size="xs" />
          </div>
        </div>

        <div className="col-span-4 mb-1">
          <div className="bg-black text-white text-base font-bold h-8 flex items-center justify-between rounded-tl-2xl rounded-tr-2xl">
            <div className="flex items-center">
              <div className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-blue p-2">
                <TiPlus className="text-2xl" />
              </div>
              Pináculo:
              {' '}
              {partner2.nameView}
            </div>
          </div>
          <div className="pinnacle-wrap px-5 py-4">
            <AnnualReturn annualReturn={annualReturns.partner2} current months size="xs" />
          </div>
        </div>
      </div>
    </div>
  );
}

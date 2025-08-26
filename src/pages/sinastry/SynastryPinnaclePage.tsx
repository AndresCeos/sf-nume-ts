import {
  useCallback, useContext,
  useState,
} from 'react';
import { TiPlus } from 'react-icons/ti';

import NoConsultantSelected from '@/components/NoConsultantSelected';
import MetricsGrid from '@/components/partners/MetricsGrid';
import PinnaclePartner from '@/components/partners/PinnaclePartner';
import PinnacleSynastry from '@/components/partners/PinnacleSynastry';
import AnnualReturn from '@/components/personal/pinnacle/AnnualReturn';
import Pinnacle from '@/components/personal/pinnacle/Pinnacle';
import SelectPartner from '@/components/sinastry/SelectPartner';
import WrapTitle from '@/components/WrapTitle';
import { ConsultContext } from '@/context/ConsultContext';
import Synastry from '@/resources/Synastry';

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
  const { consultant, activePartner, calculationDate } = useContext(ConsultContext);

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

  // Use activePartner directly from context
  const partner = activePartner;

  // Create synastry instance directly
  const synastry = consultant && partner ? new Synastry(consultant, partner) : null;

  // Calculate annual returns directly
  const annualReturns = consultant && partner && synastry ? {
    consultant: consultant.annualReturn(calculationDate),
    partner: partner.annualReturn(calculationDate),
    synastry: synastry.annualReturn(calculationDate.year),
  } : null;

  // Calculate synastry metrics directly
  const synastryMetrics: SynastryMetrics | null = synastry ? {
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
  } : null;

  // Calculate consultant metrics directly
  const consultantMetrics: SynastryMetrics | null = consultant ? {
    name: checkboxState.checkN1
      ? `${consultant.getNameCheck()}${consultant.calcNameISK()}`
      : `${consultant.calcName()}${consultant.calcNameISK()}`,
    soul: checkboxState.checkN1
      ? `${consultant.getSoulCheck()}${consultant.calcSoulNumberISK()}`
      : `${consultant.calcSoulNumber()}${consultant.calcSoulNumberISK()}`,
    expression: checkboxState.checkN1
      ? `${consultant.getExpressionSoulCheck()}${consultant.calcSoulExpressionISK()}`
      : `${consultant.calcSoulExpression()}${consultant.calcSoulExpressionISK()}`,
    maturity: `${consultant.calcMaturity()}${consultant.calcMaturityISK()}`,
  } : null;

  // Calculate partner metrics directly
  const partnerMetrics: SynastryMetrics | null = partner ? {
    name: checkboxState.checkN2
      ? `${partner.getNameCheck()}${partner.calcNameISK()}`
      : `${partner.calcName()}${partner.calcNameISK()}`,
    soul: checkboxState.checkN2
      ? `${partner.getSoulCheck()}${partner.calcSoulNumberISK()}`
      : `${partner.calcSoulNumber()}${partner.calcSoulNumberISK()}`,
    expression: checkboxState.checkN2
      ? `${partner.getExpressionSoulCheck()}${partner.calcSoulExpressionISK()}`
      : `${partner.calcSoulExpression()}${partner.calcSoulExpressionISK()}`,
    maturity: `${partner.calcMaturity()}${partner.calcMaturityISK()}`,
  } : null;

  // Early returns
  if (!consultant) {
    return <NoConsultantSelected />;
  }

  if (!activePartner) {
    return (
      <div className="page-content bg-home-background bg-cover pb-10">
        <SelectPartner />
        <div className="col-span-12 text-center mt-8">
          <strong>Agrega/Selecciona una pareja para ver esta información</strong>
        </div>
      </div>
    );
  }

  if (!synastry || !annualReturns) {
    return (
      <div className="page-content bg-home-background bg-cover pb-10">
        <SelectPartner />
        <div className="col-span-12 text-center mt-8">
          <strong>Cargando información...</strong>
        </div>
      </div>
    );
  }

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
          {synastryMetrics && (
            <div className="pinnacle-wrap px-5 py-4 bg-active-radial shadow-sm">
              <MetricsGrid metrics={synastryMetrics} />
            </div>
          )}
        </div>

        {/* Consultant Metrics */}
        <div className="col-span-4 mb-1">
          <WrapTitle
            title={`Nombre: ${consultant.nameView}`}
            color="bg-blue"
            button={{
              handle: toggles.checkName1,
              state: checkboxState.checkN1,
              text: checkboxState.checkN1 ? 'Normal' : 'Comprobación',
            }}
          />
          <div className="pinnacle-wrap px-5 py-4 bg-white shadow-sm">
            {consultantMetrics && <MetricsGrid metrics={consultantMetrics} />}
          </div>
        </div>

        {/* Partner Metrics */}
        <div className="col-span-4 mb-1">
          <WrapTitle
            title={`Nombre: ${partner?.nameView || 'Partner'}`}
            color="bg-blue"
            button={{
              handle: toggles.checkName2,
              state: checkboxState.checkN2,
              text: checkboxState.checkN2 ? 'Normal' : 'Comprobación',
            }}
          />
          <div className="pinnacle-wrap px-5 py-4 bg-white shadow-sm">
            {partnerMetrics && <MetricsGrid metrics={partnerMetrics} />}
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
            {synastry && <PinnacleSynastry synastry={synastry} isVerificationActive={checkboxState.checkP1} size="sm" />}
          </div>
        </div>

        <div className="col-span-4 mb-1">
          <WrapTitle
            title={`Pináculo: ${consultant.nameView}`}
            color="bg-blue"
            button={{
              text: checkboxState.checkP2 ? 'Normal' : 'Comprobación',
              handle: toggles.checkPinacle2,
              state: checkboxState.checkP2,
            }}
          />
          <div className="pinnacle-wrap px-5 py-4 shadow-sm">
            <Pinnacle isVerificationActive={checkboxState.checkP2} size="sm" />
          </div>
        </div>

        <div className="col-span-4 mb-1">
          <WrapTitle
            title={`Pináculo: ${partner?.nameView || 'Partner'}`}
            color="bg-blue"
            button={{
              text: checkboxState.checkP ? 'Normal' : 'Comprobación',
              handle: toggles.checkPinacle,
              state: checkboxState.checkP,
            }}
          />
          <div className="pinnacle-wrap px-5 py-4 shadow-sm">
            {partner && <PinnaclePartner partner={partner} isVerificationActive={checkboxState.checkP} size="sm" />}
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
              {consultant.nameView}
            </div>
          </div>
          <div className="pinnacle-wrap px-5 py-4">
            <AnnualReturn annualReturn={annualReturns.consultant} current months size="xs" />
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
              {partner?.nameView || 'Partner'}
            </div>
          </div>
          <div className="pinnacle-wrap px-5 py-4">
            <AnnualReturn annualReturn={annualReturns.partner} current months size="xs" />
          </div>
        </div>
      </div>
    </div>
  );
}

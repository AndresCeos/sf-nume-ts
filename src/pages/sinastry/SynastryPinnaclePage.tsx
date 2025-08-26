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

  // TypeScript assertions - at this point we know these are not null
  const validConsultant = consultant!;
  const validActivePartner = activePartner!;

  // Create synastry instance directly
  const synastry = new Synastry(validConsultant, validActivePartner);

  // Calculate annual returns directly
  const annualReturns = {
    consultant: validConsultant.annualReturn(calculationDate),
    partner: validActivePartner.annualReturn(calculationDate),
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

  // Calculate consultant metrics directly
  const consultantMetrics: SynastryMetrics = {
    name: checkboxState.checkN1
      ? `${validConsultant.getNameCheck()}${validConsultant.calcNameISK()}`
      : `${validConsultant.calcName()}${validConsultant.calcNameISK()}`,
    soul: checkboxState.checkN1
      ? `${validConsultant.getSoulCheck()}${validConsultant.calcSoulNumberISK()}`
      : `${validConsultant.calcSoulNumber()}${validConsultant.calcSoulNumberISK()}`,
    expression: checkboxState.checkN1
      ? `${validConsultant.getExpressionSoulCheck()}${validConsultant.calcSoulExpressionISK()}`
      : `${validConsultant.calcSoulExpression()}${validConsultant.calcSoulExpressionISK()}`,
    maturity: `${validConsultant.calcMaturity()}${validConsultant.calcMaturityISK()}`,
  };

  // Calculate partner metrics directly
  const partnerMetrics: SynastryMetrics = {
    name: checkboxState.checkN2
      ? `${validActivePartner.getNameCheck()}${validActivePartner.calcNameISK()}`
      : `${validActivePartner.calcName()}${validActivePartner.calcNameISK()}`,
    soul: checkboxState.checkN2
      ? `${validActivePartner.getSoulCheck()}${validActivePartner.calcSoulNumberISK()}`
      : `${validActivePartner.calcSoulNumber()}${validActivePartner.calcSoulNumberISK()}`,
    expression: checkboxState.checkN2
      ? `${validActivePartner.getExpressionSoulCheck()}${validActivePartner.calcSoulExpressionISK()}`
      : `${validActivePartner.calcSoulExpression()}${validActivePartner.calcSoulExpressionISK()}`,
    maturity: `${validActivePartner.calcMaturity()}${validActivePartner.calcMaturityISK()}`,
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

        {/* Consultant Metrics */}
        <div className="col-span-4 mb-1">
          <WrapTitle
            title={`Nombre: ${validConsultant.nameView}`}
            color="bg-blue"
            button={{
              handle: toggles.checkName1,
              state: checkboxState.checkN1,
              text: checkboxState.checkN1 ? 'Normal' : 'Comprobación',
            }}
          />
          <div className="pinnacle-wrap px-5 py-4 bg-white shadow-sm">
            <MetricsGrid metrics={consultantMetrics} />
          </div>
        </div>

        {/* Partner Metrics */}
        <div className="col-span-4 mb-1">
          <WrapTitle
            title={`Nombre: ${validActivePartner.nameView}`}
            color="bg-blue"
            button={{
              handle: toggles.checkName2,
              state: checkboxState.checkN2,
              text: checkboxState.checkN2 ? 'Normal' : 'Comprobación',
            }}
          />
          <div className="pinnacle-wrap px-5 py-4 bg-white shadow-sm">
            <MetricsGrid metrics={partnerMetrics} />
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
            title={`Pináculo: ${validConsultant.nameView}`}
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
            title={`Pináculo: ${validActivePartner.nameView}`}
            color="bg-blue"
            button={{
              text: checkboxState.checkP ? 'Normal' : 'Comprobación',
              handle: toggles.checkPinacle,
              state: checkboxState.checkP,
            }}
          />
          <div className="pinnacle-wrap px-5 py-4 shadow-sm">
            <PinnacleComponent entity={validActivePartner} isVerificationActive={checkboxState.checkP} size="sm" />
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
              {validConsultant.nameView}
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
              {validActivePartner.nameView}
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

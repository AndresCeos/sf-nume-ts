import { useContext } from 'react';
import { TiPlus } from 'react-icons/ti';

import CircleNumber from '@/components/CircleNumber';
import NoConsultantSelected from '@/components/NoConsultantSelected';
import SelectPartner from '@/components/sinastry/SelectPartner';
import { ConsultContext } from '@/context/ConsultContext';

import pc from '@/assets/PC.png';
import pd from '@/assets/PD.png';
import pn from '@/assets/PN.png';
import pne from '@/assets/PNe.png';

function SynastryCompatibilityTablePage() {
  const { consultant, activePartnerData, selectedPartnersAsPersons } = useContext(ConsultContext);

  if (!consultant) {
    return <NoConsultantSelected />;
  }

  if (!activePartnerData || !selectedPartnersAsPersons || selectedPartnersAsPersons.length < 2) {
    return (
      <div className="grid grid-cols-12 mx-14 gap-6 mt-8 pt-10">
        <SelectPartner />
        <div className="col-span-12 text-center">
          <strong>Selecciona un grupo de parejas con al menos 2 miembros para ver la tabla de compatibilidad</strong>
        </div>
      </div>
    );
  }

  // Use the already converted Person objects from context
  const partner1 = selectedPartnersAsPersons[0];
  const partner2 = selectedPartnersAsPersons[1];

  return (
    <div className="grid grid-cols-12 mx-14 gap-6 mt-8 pt-10">
      <SelectPartner />

      <div className="col-span-12">
        <div className="bg-black text-white text-base font-bold h-8 flex justify-start items-center rounded-tl-2xl rounded-tr-2xl">
          <div className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-red-day p-2">
            <TiPlus className="text-2xl" />
          </div>
          Tabla de Compatibilidad
        </div>
        <div className="pinnacle-wrap grid grid-cols-12 px-4 py-8 w-full">
          <div className="col-start-1 col-span-3 row-start-1 bg-main border border-black text-white p-5 font-bold">Cuadro Comparativo</div>
          <div className="col-start-4 row-start-1 col-span-2 bg-main border border-black text-white p-5 font-bold">Persona 1</div>
          <div className="col-start-6 row-start-1 col-span-2 bg-main border border-black text-white p-5 font-bold">Persona 2</div>
          <div className="col-start-8 row-start-1 col-span-2 bg-main border border-black text-white p-5 font-bold">Conexión Numérica</div>

          <div className="col-start-1 col-span-3 row-start-2 bg-purple-30 border border-black p-4 font-bold">Número del Alma</div>
          <div className="col-start-4 row-start-2 col-span-2 border border-black p-4 font-bold">
            <div className="cicle-year bg-gray-300 text-xl border border-black font-bold flex items-center justify-center rounded-md w-10 h-10 m-auto">
              {partner1.calcSoulNumber()}
              {partner1.calcSoulNumberISK()}
            </div>
          </div>
          <div className="col-start-6 row-start-2 col-span-2 border border-black p-4 font-bold">
            <div className="cicle-year bg-gray-300 text-xl border border-black font-bold flex items-center justify-center rounded-md w-10 h-10 m-auto">
              {partner2.calcSoulNumber()}
              {partner2.calcSoulNumberISK()}
            </div>
          </div>
          <div className="col-start-8 row-start-2 col-span-2 border border-black p-4 font-bold flex items-center justify-center">
            <CircleNumber size="sm" appearance="yellow" border="yellow">
              {partner1.getCompatibility(partner1.calcSoulNumber(), partner2.calcSoulNumber())}
            </CircleNumber>
          </div>

          <div className="col-start-1 col-span-3 row-start-3 bg-purple-30 border border-black p-4 font-bold">Número de Expresión del Alma</div>
          <div className="col-start-4 row-start-3 col-span-2 border border-black p-4 font-bold">
            <div className="cicle-year bg-gray-300 text-xl border border-black font-bold flex items-center justify-center rounded-md w-10 h-10 m-auto">
              {partner1.calcSoulExpression()}
              {partner1.calcSoulExpressionISK()}
            </div>
          </div>
          <div className="col-start-6 row-start-3 col-span-2 border border-black p-4 font-bold">
            <div className="cicle-year bg-gray-300 text-xl border border-black font-bold flex items-center justify-center rounded-md w-10 h-10 m-auto">
              {partner2.calcSoulExpression()}
              {partner2.calcSoulExpressionISK()}
            </div>
          </div>
          <div className="col-start-8 row-start-3 col-span-2 border border-black p-4 font-bold flex items-center justify-center">
            <CircleNumber size="sm" appearance="yellow" border="yellow">
              {partner1.getCompatibility(partner1.calcSoulExpression(), partner2.calcSoulExpression())}
            </CircleNumber>
          </div>

          <div className="col-start-1 col-span-3 row-start-4 bg-purple-30 border border-black p-4 font-bold">Número de Poder del Nombre</div>
          <div className="col-start-4 row-start-4 col-span-2 border border-black p-4 font-bold">
            <div className="cicle-year bg-gray-300 text-xl border border-black font-bold flex items-center justify-center rounded-md w-10 h-10 m-auto">
              {partner1.calcName()}
              {partner1.calcNameISK()}
            </div>
          </div>
          <div className="col-start-6 row-start-4 col-span-2 border border-black p-4 font-bold">
            <div className="cicle-year bg-gray-300 text-xl border border-black font-bold flex items-center justify-center rounded-md w-10 h-10 m-auto">
              {partner2.calcName()}
              {partner2.calcNameISK()}
            </div>
          </div>
          <div className="col-start-8 row-start-4 col-span-2 border border-black p-4 font-bold flex items-center justify-center">
            <CircleNumber size="sm" appearance="yellow" border="yellow">
              {partner1.getCompatibility(partner1.calcName(), partner2.calcName())}
            </CircleNumber>
          </div>

          <div className="col-start-1 col-span-3 row-start-5 bg-purple-30 border border-black p-4 font-bold">Número Personal</div>
          <div className="col-start-4 row-start-5 col-span-2 border border-black p-4 font-bold">
            <div className="cicle-year bg-gray-300 text-xl border border-black font-bold flex items-center justify-center rounded-md w-10 h-10 m-auto">
              {partner1.getB()}
              {partner1.getBISK()}
            </div>
          </div>
          <div className="col-start-6 row-start-5 col-span-2 border border-black p-4 font-bold">
            <div className="cicle-year bg-gray-300 text-xl border border-black font-bold flex items-center justify-center rounded-md w-10 h-10 m-auto">
              {partner2.getB()}
              {partner2.getBISK()}
            </div>
          </div>
          <div className="col-start-8 row-start-5 col-span-2 border border-black p-4 font-bold flex items-center justify-center">
            <CircleNumber size="sm" appearance="yellow" border="yellow">
              {partner1.getCompatibility(partner1.getB(), partner2.getB())}
            </CircleNumber>
          </div>

          <div className="col-start-1 col-span-3 row-start-6 bg-purple-30 border border-black p-4 font-bold">Número de la Personalidad</div>
          <div className="col-start-4 row-start-6 col-span-2 border border-black p-4 font-bold">
            <div className="cicle-year bg-gray-300 text-xl border border-black font-bold flex items-center justify-center rounded-md w-10 h-10 m-auto">
              {partner1.getD()}
              {partner1.getDISK()}
            </div>
          </div>
          <div className="col-start-6 row-start-6 col-span-2 border border-black p-4 font-bold">
            <div className="cicle-year bg-gray-300 text-xl border border-black font-bold flex items-center justify-center rounded-md w-10 h-10 m-auto">
              {partner2.getD()}
              {partner2.getDISK()}
            </div>
          </div>
          <div className="col-start-8 row-start-6 col-span-2 border border-black p-4 font-bold flex items-center justify-center">
            <CircleNumber size="sm" appearance="yellow" border="yellow">
              {partner1.getCompatibility(partner1.getD(), partner2.getD())}
            </CircleNumber>
          </div>

          <div className="col-start-1 col-span-3 row-start-7 bg-purple-30 border border-black p-4 font-bold">Número del Subconsciente</div>
          <div className="col-start-4 row-start-7 col-span-2 border border-black p-4 font-bold">
            <div className="cicle-year bg-gray-300 text-xl border border-black font-bold flex items-center justify-center rounded-md w-10 h-10 m-auto">
              {partner1.getI()}
              {partner1.getIISK()}
            </div>
          </div>
          <div className="col-start-6 row-start-7 col-span-2 border border-black p-4 font-bold">
            <div className="cicle-year bg-gray-300 text-xl border border-black font-bold flex items-center justify-center rounded-md w-10 h-10 m-auto">
              {partner2.getI()}
              {partner2.getIISK()}
            </div>
          </div>
          <div className="col-start-8 row-start-7 col-span-2 border border-black p-4 font-bold flex items-center justify-center">
            <CircleNumber size="sm" appearance="yellow" border="yellow">
              {partner1.getCompatibility(partner1.getI(), partner2.getI())}
            </CircleNumber>
          </div>

          <div className="col-start-1 col-span-3 row-start-8 bg-purple-30 border border-black p-4 font-bold">Número del Destino</div>
          <div className="col-start-4 row-start-8 col-span-2 border border-black p-4 font-bold">
            <div className="cicle-year bg-gray-300 text-xl border border-black font-bold flex items-center justify-center rounded-md w-10 h-10 m-auto">
              {partner1.getH()}
              {partner1.getHISK()}
            </div>
          </div>
          <div className="col-start-6 row-start-8 col-span-2 border border-black p-4 font-bold">
            <div className="cicle-year bg-gray-300 text-xl border border-black font-bold flex items-center justify-center rounded-md w-10 h-10 m-auto">
              {partner2.getH()}
              {partner2.getHISK()}
            </div>
          </div>
          <div className="col-start-8 row-start-8 col-span-2 border border-black p-4 font-bold flex items-center justify-center">
            <CircleNumber size="sm" appearance="yellow" border="yellow">
              {partner1.getCompatibility(partner1.getH(), partner2.getH())}
            </CircleNumber>
          </div>

          <div className="col-start-1 col-span-3 row-start-9 bg-purple-30 border border-black p-4 font-bold">Número de la Madurez</div>
          <div className="col-start-4 row-start-9 col-span-2 border border-black p-4 font-bold">
            <div className="cicle-year bg-gray-300 text-xl border border-black font-bold flex items-center justify-center rounded-md w-10 h-10 m-auto">
              {partner1.calcMaturity()}
              {partner1.calcMaturityISK()}
            </div>
          </div>
          <div className="col-start-6 row-start-9 col-span-2 border border-black p-4 font-bold">
            <div className="cicle-year bg-gray-300 text-xl border border-black font-bold flex items-center justify-center rounded-md w-10 h-10 m-auto">
              {partner2.calcMaturity()}
              {partner2.calcMaturityISK()}
            </div>
          </div>
          <div className="col-start-8 row-start-9 col-span-2 border border-black p-4 font-bold flex items-center justify-center">
            <CircleNumber size="sm" appearance="yellow" border="yellow">
              {partner1.getCompatibility(partner1.calcMaturity(), partner2.calcMaturity())}
            </CircleNumber>
          </div>

          <div className="col-start-10 row-start-2 col-span-3 flex justify-center">
            <img src={pn} alt="pn" className="w-24 h-12 object-contain" />
          </div>
          <div className="col-start-10 row-start-3 col-span-3 flex justify-center">
            <b>PN</b>
            {' '}
            = Pareja Natural
          </div>
          <div className="col-start-10 row-start-4 col-span-3 flex justify-center">
            <img src={pc} alt="pc" className="w-24 h-12 object-contain" />
          </div>
          <div className="col-start-10 row-start-5 col-span-3 flex justify-center">
            <b>PC</b>
            {' '}
            = Pareja Compatible
          </div>
          <div className="col-start-10 row-start-6 col-span-3 flex justify-center">
            <img src={pd} alt="pd" className="w-24 h-12 object-contain" />
          </div>
          <div className="col-start-10 row-start-7 col-span-3 flex justify-center">
            <b>PD</b>
            {' '}
            = Pareja Desafío
          </div>
          <div className="col-start-10 row-start-8 col-span-3 flex justify-center">
            <img src={pne} alt="pne" className="w-24 h-12 object-contain" />
          </div>
          <div className="col-start-10 row-start-9 col-span-3 flex justify-center">
            <b>PNe</b>
            {' '}
            = Pareja Neutral
          </div>
        </div>
      </div>
    </div>
  );
}

export default SynastryCompatibilityTablePage;

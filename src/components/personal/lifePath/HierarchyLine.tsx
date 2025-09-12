/* eslint-disable max-len */
import CircleNumber from '@/components/CircleNumber';
import useConsult from '@/hooks/useConsult';
import { getResHierarchy, getSumHierarchy } from '@/utils/numbers';

export default function HierarchyLine() {
  const {
    consultant, calculationDate, calculationYear,
  } = useConsult();
  if (!consultant) return null;

  return (
    <div>
      <div className="w-full flex items-center justify-center bg-opacity-100">
        <div className="w-1/5 flex justify-center border-r border-black">
          <div className="grid grid-cols-3 pt-3 w-220 gap-2 relative hierarchy-lines m-auto px-5 ">
            <div className="col-start-2 row-start-1">
              <p className="mb-1 font-bold text-sm">Diálogo</p>
              <CircleNumber size="sm" appearance="green" border="green">
                {getSumHierarchy(consultant.getB(), consultant.calcLifeStage(consultant.getLifeStageNumber(calculationDate)))}
              </CircleNumber>
            </div>
            <div className="col-start-1 row-start-2 lines">
              <CircleNumber size="sm" appearance="white" border="main" radiant="inner-shadow-gold">
                {consultant.getB()}
              </CircleNumber>
            </div>
            <div className="col-start-3 row-start-2 triangle">
              <CircleNumber size="sm" appearance="white" border="secondary">
                {consultant.calcLifeStage(consultant.getLifeStageNumber(calculationDate))}
              </CircleNumber>
            </div>
            <div className="col-start-2 row-start-3">
              <CircleNumber size="sm" appearance="white" border="red">
                {getResHierarchy(consultant.getB(), consultant.calcLifeStage(consultant.getLifeStageNumber(calculationDate)))}
              </CircleNumber>
              <p className="mb-1 font-bold text-sm">Reto</p>
            </div>
            <div className="col-start-1 row-start-3 font-bold text-sm">NP</div>
            <div className="col-start-3 row-start-3 font-bold text-sm">Etapa</div>
          </div>
        </div>
        <div className="w-1/5 flex justify-center border-r border-black">
          <div className="grid grid-cols-3 pt-3 w-220 gap-2 relative hierarchy-lines m-auto px-5 ">
            <div className="col-start-2 row-start-1">
              <p className="mb-1 font-bold text-sm">Diálogo</p>
              <CircleNumber size="sm" appearance="green" border="green">
                {getSumHierarchy(consultant.calcLifeStage(consultant.getLifeStageNumber(calculationDate)), consultant.calcPersonalYear(calculationYear))}
              </CircleNumber>
            </div>
            <div className="col-start-1 row-start-2 lines">
              <CircleNumber size="sm" appearance="white" border="main" radiant="inner-shadow-gold">
                {consultant.calcLifeStage(consultant.getLifeStageNumber(calculationDate))}
              </CircleNumber>
            </div>
            <div className="col-start-3 row-start-2 triangle">
              <CircleNumber size="sm" appearance="white" border="secondary">
                {consultant.calcPersonalYear(calculationYear)}
              </CircleNumber>
            </div>
            <div className="col-start-2 row-start-3">
              <CircleNumber size="sm" appearance="white" border="red">
                {getResHierarchy(consultant.calcLifeStage(consultant.getLifeStageNumber(calculationDate)), consultant.calcPersonalYear(calculationYear))}
              </CircleNumber>
              <p className="mb-1 font-bold text-sm">Reto</p>
            </div>
            <div className="col-start-1 row-start-3 font-bold text-sm">Etapa</div>
            <div className="col-start-3 row-start-3 font-bold text-sm">Año P.</div>
          </div>
        </div>
        <div className="w-1/5 flex justify-center border-r border-black">
          <div className="grid grid-cols-3 pt-3 w-220 gap-2 relative hierarchy-lines m-auto px-5 ">
            <div className="col-start-2 row-start-1">
              <p className="mb-1 font-bold text-sm">Diálogo</p>
              <CircleNumber size="sm" appearance="green" border="green">
                {getSumHierarchy(consultant.calcPersonalYear(calculationYear), consultant.calcCurrentQuarter(calculationDate.month, calculationDate.year))}
              </CircleNumber>
            </div>
            <div className="col-start-1 row-start-2 lines">
              <CircleNumber size="sm" appearance="white" border="main" radiant="inner-shadow-gold">
                {consultant.calcPersonalYear(calculationYear)}
              </CircleNumber>
            </div>
            <div className="col-start-3 row-start-2 triangle">
              <CircleNumber size="sm" appearance="white" border="secondary">
                {consultant.calcCurrentQuarter(calculationDate.month, calculationDate.year)}
              </CircleNumber>
            </div>
            <div className="col-start-2 row-start-3">
              <CircleNumber size="sm" appearance="white" border="red">
                {getResHierarchy(consultant.calcPersonalYear(calculationYear), consultant.calcCurrentQuarter(calculationDate.month, calculationDate.year))}
              </CircleNumber>
              <p className="mb-1 font-bold text-sm">Reto</p>
            </div>
            <div className="col-start-1 row-start-3 font-bold text-sm">Año P.</div>
            <div className="col-start-3 row-start-3 font-bold text-sm">Cuat.</div>
          </div>
        </div>
        <div className="w-1/5 flex justify-center border-r border-black">
          <div className="grid grid-cols-3 pt-3 w-220 gap-2 relative hierarchy-lines m-auto px-5 ">
            <div className="col-start-2 row-start-1">
              <p className="mb-1 font-bold text-sm">Diálogo</p>
              <CircleNumber size="sm" appearance="green" border="green">
                {getSumHierarchy(consultant.calcCurrentQuarter(calculationDate.month, calculationDate.year), consultant.calcPersonalMonth(calculationDate))}
              </CircleNumber>
            </div>
            <div className="col-start-1 row-start-2 lines">
              <CircleNumber size="sm" appearance="white" border="main" radiant="inner-shadow-gold">
                {consultant.calcCurrentQuarter(calculationDate.month, calculationDate.year)}
              </CircleNumber>
            </div>
            <div className="col-start-3 row-start-2 triangle">
              <CircleNumber size="sm" appearance="white" border="secondary">
                {consultant.calcPersonalMonth(calculationDate)}
              </CircleNumber>
            </div>
            <div className="col-start-2 row-start-3">
              <CircleNumber size="sm" appearance="white" border="red">
                {getResHierarchy(consultant.calcCurrentQuarter(calculationDate.month, calculationDate.year), consultant.calcPersonalMonth(calculationDate))}
              </CircleNumber>
              <p className="mb-1 font-bold text-sm">Reto</p>
            </div>
            <div className="col-start-1 row-start-3 font-bold text-sm">Cuat.</div>
            <div className="col-start-3 row-start-3 font-bold text-sm">Mes P.</div>
          </div>
        </div>
        <div className="w-1/5 flex justify-center ">
          <div className="grid grid-cols-3 pt-3 w-220 gap-2 relative hierarchy-lines m-auto px-5">
            <div className="col-start-2 row-start-1">
              <p className="mb-1 font-bold text-sm">Diálogo</p>
              <CircleNumber size="sm" appearance="green" border="green">
                {getSumHierarchy(consultant.calcPersonalMonth(calculationDate), Number(consultant.calcPersonalWeek(calculationDate)))}
              </CircleNumber>
            </div>
            <div className="col-start-1 row-start-2 lines">
              <CircleNumber size="sm" appearance="white" border="main" radiant="inner-shadow-gold">
                {consultant.calcPersonalMonth(calculationDate)}
              </CircleNumber>
            </div>
            <div className="col-start-3 row-start-2 triangle">
              <CircleNumber size="sm" appearance="white" border="secondary">
                {consultant.calcPersonalWeek(calculationDate)}
              </CircleNumber>
            </div>
            <div className="col-start-2 row-start-3">
              <CircleNumber size="sm" appearance="white" border="red">
                {getResHierarchy(consultant.calcPersonalMonth(calculationDate), Number(consultant.calcPersonalWeek(calculationDate)))}
              </CircleNumber>
              <p className="mb-1 font-bold text-sm">Reto</p>
            </div>
            <div className="col-start-1 row-start-3 font-bold text-sm">Mes P.</div>
            <div className="col-start-3 row-start-3 font-bold text-sm">Semana P.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

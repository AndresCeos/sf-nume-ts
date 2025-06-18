/* eslint-disable max-len */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TiPlus } from 'react-icons/ti';

import NoConsultantSelected from '@/components/NoConsultantSelected';
import ActiveNameComponents from '@/components/personal/name/ActiveNameComponents';
import BalanceExistential from '@/components/personal/name/balanceExistential';
import Breakdown from '@/components/personal/name/Breakdown';
import FrequentNamePotential from '@/components/personal/name/frequentNamePotential';
import InclusionTable from '@/components/personal/name/InclusionTable';
import NameCycle from '@/components/personal/name/NameCycle';
import NumericalValuesOfTheName from '@/components/personal/name/numericalValuesOfTheName';
import WrapTitle from '@/components/WrapTitle';
import useConsult from '@/hooks/useConsult';

type UngroupName = {
  v: number;
  L: string;
  c: number;
};

function NamePage() {
  const { consultant } = useConsult();
  const { t } = useTranslation();
  const [checkN, setcheckN] = useState(false);

  if (!consultant) return (<NoConsultantSelected />);

  const {
    name, lastName, scdLastName, nameView,
  } = consultant;
  const names = nameView.toLocaleLowerCase().split(' ');

  const ungroupNames = names.map((el: string) => ({
    name: consultant.getUngroupName(el),
    values: consultant.getUngroupNameValues(el),
    total: consultant.getUngroupNameTotal(el),
  }));

  ungroupNames.forEach((el: { name: UngroupName[] }) => {
    for (let index = el.name.length; index < 28; index += 1) {
      el.name.push({} as UngroupName);
    }
  });

  const ungroupLast = consultant.getUngroupName(lastName);

  for (let index = ungroupLast.length; index < 28; index += 1) {
    ungroupLast.push({} as UngroupName);
  }

  const ungroupSCDLast = consultant.getUngroupName(scdLastName);

  for (let index = ungroupSCDLast.length; index < 28; index += 1) {
    ungroupSCDLast.push({} as UngroupName);
  }

  const ungroupName = consultant.getUngroupName(name);

  for (let index = ungroupName.length; index < 28; index += 1) {
    ungroupName.push({} as UngroupName);
  }

  const checkName = () => {
    if (checkN) {
      setcheckN(false);
    } else {
      setcheckN(true);
    }
  };

  return (
    <div className="page-content bg-home-background bg-cover pb-10">
      <div className="grid grid-cols-12 mt-8 mx-14 gap-6 pt-10">
        <div className="col-span-5 mb-5">
          <WrapTitle
            title={t('name.numericValues.title')}
            color="bg-blue"
            button={{
              handle: checkName,
              state: checkN,
              text: 'Comprobación',
            }}
          />
          <NumericalValuesOfTheName
            checkN={checkN}
          />
        </div>

        <div className="col-span-7 mb-5">
          <div className="bg-black text-white text-base font-bold h-8 flex justify-start items-center rounded-tl-2xl rounded-tr-2xl">
            <div className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-blue p-2">
              <TiPlus className="text-2xl" />
            </div>
            {t('name.potential.title')}
          </div>
          <FrequentNamePotential />
        </div>

        <div className="col-span-12 mb-5">
          <div className="bg-black text-white text-base font-bold h-8 flex justify-start items-center rounded-tl-2xl rounded-tr-2xl">
            <div className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-blue p-2">
              <TiPlus className="text-2xl" />
            </div>
            {t('name.breakdown.title')}
          </div>
          <Breakdown />
        </div>

        <div className="col-span-12 mb-5">
          <div className="bg-black text-white text-base font-bold h-8 flex justify-start items-center rounded-tl-2xl rounded-tr-2xl">
            <div className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-blue p-2">
              <TiPlus className="text-2xl" />
            </div>
            {t('name.activeName.title')}
          </div>
          <ActiveNameComponents />
        </div>

        <div className="col-span-12 mb-5">
          <div className="bg-black text-white text-base font-bold h-8 flex justify-start items-center rounded-tl-2xl rounded-tr-2xl">
            <div className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-blue p-2">
              <TiPlus className="text-2xl" />
            </div>
            {t('name.nameCycle.title')}
          </div>
          <NameCycle />
        </div>

        <div className="col-span-12 mb-5">
          <div className="bg-black text-white text-base font-bold h-8 flex justify-start items-center rounded-tl-2xl rounded-tr-2xl">
            <div className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-blue p-2">
              <TiPlus className="text-2xl" />
            </div>
            {t('name.balanceExistential.title')}
          </div>
          <BalanceExistential />
        </div>

        <div className="col-span-12 mb-5">
          <div className="bg-black text-white text-base font-bold h-8 flex justify-start items-center rounded-tl-2xl rounded-tr-2xl">
            <div className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-blue p-2">
              <TiPlus className="text-2xl" />
            </div>
            {t('name.inclusionTable.title')}
          </div>
          <InclusionTable />
        </div>
      </div>
    </div>

  );
}

export default NamePage;

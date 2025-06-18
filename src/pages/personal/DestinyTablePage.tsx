import { useTranslation } from 'react-i18next';

import { TiPlus } from 'react-icons/ti';

import DestinyTable from '@/components/personal/destinyTable/DestinyTable';
import NumericValues from '@/components/personal/destinyTable/NumericValues';
import useConsult from '@/hooks/useConsult';

export default function DestinyTablePage() {
  const { t } = useTranslation();
  const { consultant } = useConsult();
  if (!consultant) return null;

  const table = consultant.getDestinityTable();
  const table1 = table.slice(0, 30);
  const table2 = table.slice(30, 60);
  const table3 = table.slice(60, 90);
  const table4 = table.slice(90, 120);

  const nameCycles = consultant.calcNameCycles();
  const nameSubCycles = consultant.calcNameSubCycles();
  return (
    <div className="page-content bg-home-background bg-cover pb-10">
      <div className="grid grid-cols-12 mt-8 mx-14 gap-6 pt-10 relative">
        <div className="col-span-12 mb-5">
          <div className="bg-black text-white text-base font-bold h-8 flex justify-start items-center rounded-tl-2xl rounded-tr-2xl">
            <div className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-gold p-2">
              <TiPlus className="text-2xl" />
            </div>
            {t('destinyTable.title')}
          </div>
          <div className="pinnacle-wrap px-8 pb-3 pt-10">
            <DestinyTable
              table={table1}
              start={0}
              consultant={consultant}
              nameCycles={nameCycles}
              nameSubCycles={nameSubCycles}
            />
            <DestinyTable
              table={table2}
              start={30}
              consultant={consultant}
              nameCycles={nameCycles}
              nameSubCycles={nameSubCycles}
            />
            <DestinyTable
              table={table3}
              start={60}
              consultant={consultant}
              nameCycles={nameCycles}
              nameSubCycles={nameSubCycles}
            />
            <DestinyTable
              table={table4}
              start={90}
              consultant={consultant}
              nameCycles={nameCycles}
              nameSubCycles={nameSubCycles}
            />
          </div>
        </div>
        <div className="col-span-12 mb-5">
          <div className="bg-black text-white text-base font-bold h-8 flex justify-start items-center rounded-tl-2xl rounded-tr-2xl">
            <div className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-blue p-2">
              <TiPlus className="text-2xl" />
            </div>
            {t('destinyTable.numericValues.title')}
          </div>
          <NumericValues />
        </div>
      </div>
    </div>
  );
}

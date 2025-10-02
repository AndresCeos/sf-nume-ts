import Person, { SplittedDate } from '@/resources/Person';
import CreateNameActiveName from './CreateNameActiveName';

type DestinyTableCreateNameProps = {
  createNameObj: Person;
  calculationDate: SplittedDate;
};
export default function DestinyTableCreateName({ createNameObj, calculationDate }: DestinyTableCreateNameProps) {
  const age = createNameObj.getYearsOld(calculationDate.year);
  const table = createNameObj.getNameSetting();
  let table1: any[] = [];
  let table2: any[] = [];
  let table3: any[] = [];
  let table4: any[] = [];
  let table5: any[] = [];
  let table6: any[] = [];
  let nameCycles: number[] = [];
  let nameSubCycles: number[] = [];

  table1 = table.slice(0, 31);
  table2 = table.slice(31, 62);
  table3 = table.slice(62, 93);
  table4 = table.slice(93, 124);
  table5 = table.slice(124, 155);
  table6 = table.slice(155, 186);
  nameCycles = createNameObj.calcNameCycles();
  nameSubCycles = createNameObj.calcNameSubCycles();

  return (
    <div className="pinnacle-wrap px-8 py-8">

      <div>
        <CreateNameActiveName table={table1} start={0} nameCycles={nameCycles} nameSubCycles={nameSubCycles} consultant={createNameObj} age={age} />
        <CreateNameActiveName table={table2} start={31} nameCycles={nameCycles} nameSubCycles={nameSubCycles} consultant={createNameObj} age={age} />
        <CreateNameActiveName table={table3} start={62} nameCycles={nameCycles} nameSubCycles={nameSubCycles} consultant={createNameObj} age={age} />
        <CreateNameActiveName table={table4} start={93} nameCycles={nameCycles} nameSubCycles={nameSubCycles} consultant={createNameObj} age={age} />
        <CreateNameActiveName table={table5} start={124} nameCycles={nameCycles} nameSubCycles={nameSubCycles} consultant={createNameObj} age={age} />
        <CreateNameActiveName table={table6} start={155} nameCycles={nameCycles} nameSubCycles={nameSubCycles} consultant={createNameObj} age={age} />
      </div>

    </div>
  );
}

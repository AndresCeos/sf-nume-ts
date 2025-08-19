/* eslint-disable max-len */
// import { useTranslation } from 'react-i18next';

import { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { TiPlus } from 'react-icons/ti';

import { parse } from 'date-fns';
import NoConsultantSelected from '@/components/NoConsultantSelected';

import WrapTitle from '@/components/WrapTitle';
import NameBreakdown from '@/components/personal/createName/NameBreakdown';
import ActiveName from '@/components/personal/name/ActiveName';
import Pinnacle from '@/components/personal/pinnacle/Pinnacle';
import AnnualReturn from '@/components/personal/vibrationTime/AnnualReturn';
import useConsult from '@/hooks/useConsult';
import Person from '@/resources/Person';

type UngroupName = {
  v: number;
  L: string;
  c: number;
};
type Ungroup = {
  ungroupNameI: UngroupName[];
};

function CreateNamePage() {
  const { consultant, calculationDate } = useConsult();

  // Mover todos los hooks al inicio, antes de cualquier lógica condicional
  const [createName, setCreateName] = useState('');
  const [createDate, setCreateDate] = useState(new Date('yyyy-MM-dd'));
  const [isEditing, setIsEditing] = useState(false);
  const [checkN, setcheckN] = useState(false);
  const [checkP, setcheckP] = useState(false);

  if (!consultant) return (<NoConsultantSelected />);

  const {
    name: nameConsultant, lastName, scdLastName, birthDate,
  } = consultant;

  const createNameData = {
    id: consultant.id,
    name: !isEditing ? `${nameConsultant} ${lastName} ${scdLastName}` : createName || '',
    lastName: '',
    scdLastName: '',
    birthDate: !isEditing ? parse(birthDate.toISOString(), 'yyyy-MM-dd', new Date()) : parse(createDate.toISOString(), 'yyyy-MM-dd', new Date()),
  };

  console.log({ createNameData, birthDate });
  const createNameObj = new Person({ ...createNameData, birthDate: createNameData.birthDate.toISOString() });

  const ungroupName = createNameObj.getUngroupName(createNameData.name);
  const ungroupNameT = createNameObj.getUngroupNameTotal(createNameData.name);

  let ungroup: Ungroup[] = [];
  const split = 28;
  let tables = 0;
  let count = 0;
  do {
    count = (tables + 1) * split;
    const ungroupNameI = ungroupName.slice(tables * split, count);
    while (ungroupNameI.length < 28) {
      ungroupNameI.push({} as UngroupName);
    }
    ungroup = [
      ...ungroup,
      {
        ungroupNameI,
      },
    ];
    console.log(tables * split, count);
    tables += 1;
  } while (count < ungroupName.length);

  const annualReturnPastYear = createNameObj.annualReturn({ year: calculationDate.year - 1 });
  const annualReturnCurrent = createNameObj.annualReturn({ year: calculationDate.year });
  const annualReturnNextYear = createNameObj.annualReturn({ year: calculationDate.year + 1 });

  const checkName = () => {
    setcheckN(!checkN);
  };
  const checkPinacle = () => {
    setcheckP(!checkP);
  };

  const isValid = () => {
    const valid = /^[a-zA-Z ñÑ]+$/;
    if (createNameData.name === '' || !valid.test(createNameData.name)) return false;
    if (createNameData.birthDate === null) return false;
    if (createNameData.name === '' && createNameData.birthDate === null) return false;
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setCreateName(value);
    } else if (name === 'date') {
      setCreateDate(new Date(value));
    }
    setIsEditing(true);
  };

  let table;
  // console.log('this is table => ' + table)
  // console.log(table)
  let table1: any[] = [];
  let table2: any[] = [];
  let table3: any[] = [];
  let table4: any[] = [];
  let nameCycles: number[] = [];
  let nameSubCycles: number[] = [];

  if (isValid()) {
    table = createNameObj.getNameSetting();
    // console.log('this is table => ' + table)
    // console.log(table)
    table1 = table.slice(0, 31);
    table2 = table.slice(31, 62);
    table3 = table.slice(62, 93);
    table4 = table.slice(93, 124);
    nameCycles = createNameObj.calcNameCycles();
    nameSubCycles = createNameObj.calcNameSubCycles();
  } else {
    table = [];
    // console.log('this is table => ' + table)
    // console.log(table)
    table1 = [];
    table2 = [];
    table3 = [];
    table4 = [];
    nameCycles = [];
    nameSubCycles = [];
  }

  return (
    <div className="page-content bg-home-background bg-cover pb-10">
      <div className="grid grid-cols-12 mt-8 mx-14 gap-6 pt-10">
        <div className="col-span-12 mb-5">
          <div className="bg-black text-white text-base font-bold h-8 flex justify-start items-center rounded-tl-2xl rounded-tr-2xl">
            <div className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-blue p-2">
              <TiPlus className="text-2xl" />
            </div>
            Crear Nombre
            <MdEdit className="ml-2 text-2xl" />
          </div>
          <div className="pinnacle-wrap px-8 py-8">
            <div className="form-container block">
              <div className="flex w-full gap-4">
                <div className="form-group w-2/3">
                  <p className="font-bold mb-1 ">
                    <MdEdit className="text-xl" />
                    {' '}
                    Nombre
                  </p>
                  <input
                    type="text"
                    name="name"
                    value={createNameData.name as string}
                    onChange={handleChange}
                    className="rounded"
                  />
                </div>
                <div className="form-group w-1/3">
                  <p className="font-bold mb-1">
                    <MdEdit className="text-xl" />
                    {' '}
                    Fecha de Nacimiento:
                  </p>
                  <input
                    type="date"
                    name="date"
                    value={createNameData.birthDate.toISOString()}
                    onChange={handleChange}
                    className="rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {
        isValid()
          ? (
            <>
              <div className="col-span-8 mb-5">
                <WrapTitle
                  title="Valores Numéricos del Nombre"
                  color="bg-blue"
                  button={{
                    handle: checkName,
                    state: checkN,
                    text: 'Comprobación',
                  }}
                />
                <div className="pinnacle-wrap px-8 py-8">
                  <div className="flex justify-between">
                    <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
                      <p className="text-13 mb-3">Nombre</p>
                      <div className="w-18 h-18 text-3xl font-black text-black flex justify-center items-center bg-blue-30 border border-blue rounded-full inner-shadow">
                        {(!checkN) ? `${createNameObj.calcName()}${createNameObj.calcNameISK()}` : `${createNameObj.getNameCheck()}${createNameObj.getNameCheckISK()}`}
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
                      <p className="text-13 mb-3">Alma</p>
                      <div className="w-18 h-18 text-3xl font-black text-black flex justify-center items-center bg-blue-30 border border-blue rounded-full inner-shadow-gold">
                        {(!checkN) ? `${createNameObj.calcSoulNumber()}${createNameObj.calcSoulNumberISK()}` : `${createNameObj.getSoulCheck()}${createNameObj.calcSoulNumberISK()}`}
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
                      <p className="text-13 mb-3">Expresión</p>
                      <div className="w-18 h-18 text-3xl font-black text-black flex justify-center items-center bg-blue-30 border border-blue rounded-full inner-shadow">
                        {(!checkN) ? `${createNameObj.calcSoulExpression()}${createNameObj.calcSoulExpressionISK()}` : `${createNameObj.getExpressionSoulCheck()}${createNameObj.calcSoulExpressionISK()}`}
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
                      <p className="text-13 mb-3">Madurez</p>
                      <div className="w-18 h-18 text-3xl font-black text-black flex justify-center items-center bg-aguamarina-30 border border-aguamarina rounded-full inner-shadow">
                        {(!checkN) ? `${createNameObj.calcMaturity()}${createNameObj.calcMaturityISK()}` : `${createNameObj.calcMaturity()}${createNameObj.calcMaturityISK()}`}
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center text-gray-500 font-bold">
                      <p className="text-13 mb-3">Ciclo de letras</p>
                      <div className="w-18 h-18 text-3xl font-black text-black flex justify-center items-center bg-white border border-blue rounded-full inner-shadow">
                        {createNameObj.nameCount()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-4 row-span-2 mb-5">
                <WrapTitle
                  title="Pináculo"
                  color="bg-blue"
                  button={{
                    text: 'Comprobación',
                    handle: checkPinacle,
                    state: checkP,
                  }}
                />
                <div className="pinnacle-wrap px-8 py-3">
                  <Pinnacle isVerificationActive={checkP} size="sm" />
                </div>
              </div>

              <div className="col-span-8 mb-5">
                <div className="bg-black text-white text-base font-bold h-8 flex justify-start items-center rounded-tl-2xl rounded-tr-2xl">
                  <div className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-blue p-2">
                    <TiPlus className="text-2xl" />
                  </div>
                  Tabla de inclusión
                </div>
                <div className="pinnacle-wrap px-8 py-10">
                  <div className="grid grid-cols-10 gap-3">
                    <div className=" gap-4 flex justify-center items-center flex-col">
                      <div className="h-5" />
                      <div className="w-full col-start-1 row-start-2 col-span-2 h-10 text-13 font-black text-gray-400 flex justify-center items-center">
                        Casas:
                      </div>
                      <div className="w-full col-start-1 row-start-3 col-span-2 h-10 text-13 font-black text-gray-400 flex justify-center items-center">
                        Habs:
                      </div>
                    </div>

                    {Object.entries(createNameObj.getAppearances()).map((el) => (
                      <div className="gap-4 flex justify-center items-center flex-col">
                        <div className="text-13 text-gray-500 h-5">
                          {el[1].v}
                          {' '}
                        </div>
                        <div className="h-10 w-10 text-xl font-bold flex justify-center items-center bg-purple-30 border border-main rounded-md inner-shadow">
                          {el[0]}
                          {' '}
                        </div>
                        <div className="h-10 w-10 text-xl font-bold flex justify-center items-center bg-gray-300 border border-gray-500 rounded-md inner-shadow">
                          {el[1].a}
                          {' '}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-span-12 mb-5">
                <div className="bg-black text-white text-base font-bold h-8 flex justify-start items-center rounded-tl-2xl rounded-tr-2xl">
                  <div className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-green-s p-2">
                    <TiPlus className="text-2xl" />
                  </div>
                  Retornos Anuales
                  <MdEdit className="ml-2 text-2xl" />
                </div>
                <div className="pinnacle-wrap overflow-hidden grid grid-cols-3">
                  <div className="px-5 py-8">
                    <AnnualReturn annualReturn={annualReturnPastYear} size="xs" />
                  </div>
                  <div className="px-5 py-8 border-b border-solid border-gray-300 bg-active-radial bg-opacity-15">
                    <AnnualReturn annualReturn={annualReturnCurrent} current months size="xs" />
                  </div>
                  <div className="px-5 py-8 border-r border-gray-400">
                    <AnnualReturn annualReturn={annualReturnNextYear} size="xs" />
                  </div>
                </div>
              </div>

              <div className="col-span-12 mb-5">
                <div className="bg-black text-white text-base font-bold h-8 flex justify-start items-center rounded-tl-2xl rounded-tr-2xl">
                  <div className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-blue p-2">
                    <TiPlus className="text-2xl" />
                  </div>
                  Desglose del Nombre
                  <MdEdit className="ml-2 text-2xl" />
                </div>
                <div className="pinnacle-wrap px-8 py-8">
                  <div className="flex justify-center">
                    <div className="">
                      {
                        ungroup.map((group) => (
                          <NameBreakdown
                            name={group.ungroupNameI}
                            values={group.ungroupNameI}
                            total={group.ungroupNameI}
                            description={`N${(group.ungroupNameI[0]?.L || '').length + 1}`}
                          />
                        ))
                      }
                    </div>
                    <div className="nameBreakdown mb-4 flex">
                      <div className="ml-5">
                        <div className={`
                          text-13 w-30 h-30 bg-gold bg-opacity-10 rounded-md inner-shadow
                          ${ungroup.length > 1 ? 'mb-4' : ''}
                        `}
                        >
                          {ungroupNameT[0].v !== 0 ? ungroupNameT[0].v : ''}
                        </div>
                        <div className={`
                          text-13 w-30 h-30 font-bold bg-main text-white rounded-md inner-shadow
                          ${ungroup.length > 1 ? 'mb-4' : ''}
                        `}
                        >
                          {ungroupNameT[0].L}
                        </div>
                        <div className={`
                          text-13 w-30 h-30 bg-gold bg-opacity-10 rounded-md inner-shadow
                          ${ungroup.length > 1 ? 'mb-4' : ''}
                        `}
                        >
                          {ungroupNameT[0].c !== 0 ? ungroupNameT[0].c : ''}
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className={`
                          text-13 w-30 h-30 font-bold
                          ${ungroup.length > 1 ? 'mb-4' : ''}
                        `}
                        >
                          V
                        </div>
                        <div className={`
                          text-13 h-30 font-bold
                          ${ungroup.length > 1 ? 'mb-4' : ''}
                        `}
                        >
                          N
                        </div>
                        <div className={`
                          text-13 w-30 h-30 font-bold
                          ${ungroup.length > 1 ? 'mb-4' : ''}
                        `}
                        >
                          C
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 mb-5">
                <div className="bg-black text-white text-base font-bold h-8 flex justify-start items-center rounded-tl-2xl rounded-tr-2xl">
                  <div className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-blue p-2">
                    <TiPlus className="text-2xl" />
                  </div>
                  Ciclo del Nombre
                </div>
                <div className="pinnacle-wrap px-8 py-8">
                  {isValid()
                    ? (
                      <div>
                        <ActiveName table={table1} start={0} nameCycles={nameCycles} nameSubCycles={nameSubCycles} />
                        <ActiveName table={table2} start={31} nameCycles={nameCycles} nameSubCycles={nameSubCycles} />
                        <ActiveName table={table3} start={62} nameCycles={nameCycles} nameSubCycles={nameSubCycles} />
                        <ActiveName table={table4} start={93} nameCycles={nameCycles} nameSubCycles={nameSubCycles} />
                      </div>
                    )
                    : null}
                </div>
              </div>

            </>
          )
          : <div className="col-span-12 text-center font-bold">Ingresa datos validos.</div>
      }

      </div>
    </div>
  );
}

export default CreateNamePage;

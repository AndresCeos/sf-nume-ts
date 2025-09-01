import { getYear } from 'date-fns';
import { useContext, useState } from 'react';
import { TiPlus } from 'react-icons/ti';

import NoConsultantSelected from '@/components/NoConsultantSelected';
import DestinyTable from '@/components/personal/destinyTable/DestinyTable';
import SelectPartner from '@/components/sinastry/SelectPartner';
import { ConsultContext } from '@/context/ConsultContext';
import Synastry from '@/resources/Synastry';

interface SinastryDestinyTableComponent {
  table1: any[];
  start1: number;
  person1: any;
  table2: any[];
  start2: number;
  person2: any;
}

function SinastryDestinyTable({
  table1,
  start1,
  person1,
  table2,
  start2,
  person2,
}: SinastryDestinyTableComponent) {
  return (
    <div className="mb-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-semibold mb-2">
            Persona 1:
            {person1.nameView}
          </h4>
          <DestinyTable
            table={table1}
            start={start1}
            consultant={person1}
            nameCycles={person1.calcNameCycles()}
            nameSubCycles={person1.calcNameSubCycles()}
          />
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2">
            Persona 2:
            {person2.nameView}
          </h4>
          <DestinyTable
            table={table2}
            start={start2}
            consultant={person2}
            nameCycles={person2.calcNameCycles()}
            nameSubCycles={person2.calcNameSubCycles()}
          />
        </div>
      </div>
    </div>
  );
}

export default function SinastryDestinyTablePage() {
  const {
    consultant, activePartnerData, selectedPartnersAsPersons,
  } = useContext(ConsultContext);
  const [partnerActive, setPartnerActive] = useState<boolean>(true);
  const [personOneActive, setPersonOneActive] = useState<boolean>(false);
  const [personTwoActive, setPersonTwoActive] = useState<boolean>(false);

  if (!consultant) {
    return <NoConsultantSelected />;
  }

  if (!activePartnerData || !selectedPartnersAsPersons || selectedPartnersAsPersons.length < 2) {
    return (
      <div className="page-content bg-home-background bg-cover pb-10">
        <SelectPartner />
        <div className="col-span-12 text-center mt-8">
          <strong>Selecciona un grupo de parejas con al menos 2 miembros para ver la tabla de destino de sinastría</strong>
        </div>
      </div>
    );
  }

  // Use the already converted Person objects from context
  const person1 = selectedPartnersAsPersons[0]; // Pareja 1
  const person2 = selectedPartnersAsPersons[1]; // Pareja 2

  // Create synastry instance between the two partners (not consultant)
  const synastry = new Synastry(person1, person2);
  const yearMeet = synastry.getYearMeet() || new Date().getFullYear();

  // Calculate age when they met for person1
  const ageMeetP1 = yearMeet - getYear(person1.birthDate);
  const destinyTableP1 = person1.getDestinityTable();
  const tableFromMeetP1 = destinyTableP1.slice(ageMeetP1);

  // Calculate age when they met for person2
  const ageMeetP2 = yearMeet - getYear(person2.birthDate);
  const destinyTableP2 = person2.getDestinityTable();
  const tableFromMeetP2 = destinyTableP2.slice(ageMeetP2);

  // Split tables into sections for synastry view (from when they met)
  const synastryTable1P1 = tableFromMeetP1.slice(0, 11);
  const synastryTable2P1 = tableFromMeetP1.slice(11, 22);
  const synastryTable3P1 = tableFromMeetP1.slice(22, 33);
  const synastryTable4P1 = tableFromMeetP1.slice(33, 44);

  const synastryTable1P2 = tableFromMeetP2.slice(0, 11);
  const synastryTable2P2 = tableFromMeetP2.slice(11, 22);
  const synastryTable3P2 = tableFromMeetP2.slice(22, 33);
  const synastryTable4P2 = tableFromMeetP2.slice(33, 44);

  // Full lifetime tables for individual view
  const fullTable1P1 = destinyTableP1.slice(0, 30);
  const fullTable2P1 = destinyTableP1.slice(30, 60);
  const fullTable3P1 = destinyTableP1.slice(60, 90);
  const fullTable4P1 = destinyTableP1.slice(90, 120);

  const fullTable1P2 = destinyTableP2.slice(0, 30);
  const fullTable2P2 = destinyTableP2.slice(30, 60);
  const fullTable3P2 = destinyTableP2.slice(60, 90);
  const fullTable4P2 = destinyTableP2.slice(90, 120);

  // Name cycles for both persons
  const nameCyclesP1 = person1.calcNameCycles();
  const nameSubCyclesP1 = person1.calcNameSubCycles();
  const nameCyclesP2 = person2.calcNameCycles();
  const nameSubCyclesP2 = person2.calcNameSubCycles();

  const selectPartner = () => {
    setPartnerActive(true);
    setPersonOneActive(false);
    setPersonTwoActive(false);
  };

  const selectPersonOne = () => {
    setPartnerActive(false);
    setPersonOneActive(true);
    setPersonTwoActive(false);
  };

  const selectPersonTwo = () => {
    setPartnerActive(false);
    setPersonOneActive(false);
    setPersonTwoActive(true);
  };

  return (
    <div className="page-content bg-home-background bg-cover pb-10">
      <SelectPartner />

      <div className="grid grid-cols-12 mx-14 gap-6 mt-8 pt-10">
        <div className="col-span-12 mb-5 relative">
          <div className="bg-black text-white text-base font-bold h-8 flex justify-between items-center rounded-tl-2xl rounded-tr-2xl">
            <div className="flex justify-center items-center">
              <div className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-gold p-2">
                <TiPlus className="text-2xl" />
              </div>
              Tabla del Destino de la Pareja
            </div>
            <div className="flex justify-center items-center">
              <button
                type="button"
                className={`font-bold h-10 mb-1 rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl text-13 px-2 ml-2 flex justify-center items-center ${!partnerActive ? 'bg-gray-400' : 'bg-yellow'
                }`}
                onClick={selectPartner}
              >
                Pareja
              </button>
              <button
                type="button"
                className={`font-bold h-10 mb-1 rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl text-13 px-2 ml-2 flex justify-center items-center ${!personOneActive ? 'bg-gray-400' : 'bg-yellow'
                }`}
                onClick={selectPersonOne}
              >
                Persona 1
              </button>
              <button
                type="button"
                className={`font-bold h-10 mb-1 rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl text-13 px-2 ml-2 flex justify-center items-center ${!personTwoActive ? 'bg-gray-400' : 'bg-yellow'
                }`}
                onClick={selectPersonTwo}
              >
                Persona 2
              </button>
            </div>
          </div>
          <div className="pinnacle-wrap px-8 py-3">
            {partnerActive && (
              <>
                <SinastryDestinyTable
                  table1={synastryTable1P1}
                  start1={0 + ageMeetP1}
                  person1={person1}
                  table2={synastryTable1P2}
                  start2={0 + ageMeetP2}
                  person2={person2}
                />
                <SinastryDestinyTable
                  table1={synastryTable2P1}
                  start1={11 + ageMeetP1}
                  person1={person1}
                  table2={synastryTable2P2}
                  start2={11 + ageMeetP2}
                  person2={person2}
                />
                <SinastryDestinyTable
                  table1={synastryTable3P1}
                  start1={22 + ageMeetP1}
                  person1={person1}
                  table2={synastryTable3P2}
                  start2={22 + ageMeetP2}
                  person2={person2}
                />
                <SinastryDestinyTable
                  table1={synastryTable4P1}
                  start1={33 + ageMeetP1}
                  person1={person1}
                  table2={synastryTable4P2}
                  start2={33 + ageMeetP2}
                  person2={person2}
                />
              </>
            )}
            {personOneActive && (
              <>
                <DestinyTable
                  table={fullTable1P1}
                  start={0}
                  consultant={person1}
                  nameCycles={nameCyclesP1}
                  nameSubCycles={nameSubCyclesP1}
                />
                <DestinyTable
                  table={fullTable2P1}
                  start={30}
                  consultant={person1}
                  nameCycles={nameCyclesP1}
                  nameSubCycles={nameSubCyclesP1}
                />
                <DestinyTable
                  table={fullTable3P1}
                  start={60}
                  consultant={person1}
                  nameCycles={nameCyclesP1}
                  nameSubCycles={nameSubCyclesP1}
                />
                <DestinyTable
                  table={fullTable4P1}
                  start={90}
                  consultant={person1}
                  nameCycles={nameCyclesP1}
                  nameSubCycles={nameSubCyclesP1}
                />
              </>
            )}
            {personTwoActive && (
              <>
                <DestinyTable
                  table={fullTable1P2}
                  start={0}
                  consultant={person2}
                  nameCycles={nameCyclesP2}
                  nameSubCycles={nameSubCyclesP2}
                />
                <DestinyTable
                  table={fullTable2P2}
                  start={30}
                  consultant={person2}
                  nameCycles={nameCyclesP2}
                  nameSubCycles={nameSubCyclesP2}
                />
                <DestinyTable
                  table={fullTable3P2}
                  start={60}
                  consultant={person2}
                  nameCycles={nameCyclesP2}
                  nameSubCycles={nameSubCyclesP2}
                />
                <DestinyTable
                  table={fullTable4P2}
                  start={90}
                  consultant={person2}
                  nameCycles={nameCyclesP2}
                  nameSubCycles={nameSubCyclesP2}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

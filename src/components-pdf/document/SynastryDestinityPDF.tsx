import { PDFComponentProps, PDFPageConfig } from '../types/pdf.types';
import React from 'react';

import { default as nameImage, default as nameImage2 } from '../assets/s-destinity-table.jpg'
import { SynastryDestinityTable } from '../synastryDestinyTable/SynastryDestinyTable'
import { SynastryData } from '../synastryVibrationTime/SynastryData'

export const SynastryDestinityPDF: React.FC<{ synastry, newDate }> = ({ synastry, newDate }) => {
  const ageMeet = synastry.partner.yearMeet - synastry.consultant.birthDate.year()
  const t = synastry.consultant.getDestinityTable()
  const table = t.slice(ageMeet)
  // console.log(table)

  const table1 = table.slice(0, 11);
  const table2 = table.slice(11, 22);
  const table3 = table.slice(22, 33);
  const table4 = table.slice(33, 44);

  // console.log( moment(synastry.partner.yearMeet).year() )
  // console.log( partner.birthDate.year() )
  // const ageMeetP = moment(synastry.partner.yearMeet).year() - partner.birthDate.year()
  const ageMeetP = synastry.partner.yearMeet - synastry.partner.birthDate.year()
  let tP
  let partnerTable = []
  let partnerTable1 = []
  let partnerTable2 = []
  let partnerTable3 = []
  let partnerTable4 = []

  tP = synastry.partner.getDestinityTable()
  partnerTable = tP.slice(ageMeetP)
  partnerTable1 = partnerTable.slice(0, 11);
  partnerTable2 = partnerTable.slice(11, 22);
  partnerTable3 = partnerTable.slice(22, 33);
  partnerTable4 = partnerTable.slice(33, 44);

  return [{
    bg: nameImage,
    children: <>
      <SynastryData synastry={synastry} newDate={newDate} horizontal />
      <SynastryDestinityTable
        table={table1}
        newDate={newDate}
        start={0 + ageMeet}
        consultant={synastry.consultant}
        partner={synastry.partner}
        tableP={partnerTable1}
        startP={0 + ageMeetP}
        slice={0}
      />
      <SynastryDestinityTable
        newDate={newDate}
        slice={1}
        table={table2}
        start={11 + ageMeet}
        consultant={synastry.consultant}
        partner={synastry.partner}
        tableP={partnerTable2}
        startP={11 + ageMeetP}
      />
              </>
  }, {
    bg: nameImage2,
    children: <>
      <SynastryData synastry={synastry} newDate={newDate} horizontal />
      <SynastryDestinityTable
        table={table3}
        newDate={newDate}
        start={22 + ageMeet}
        consultant={synastry.consultant}
        partner={synastry.partner}
        tableP={partnerTable3}
        startP={22 + ageMeetP}
        slice={0}
      />
      <SynastryDestinityTable
        newDate={newDate}
        slice={1}
        table={table4}
        start={33 + ageMeet}
        consultant={synastry.consultant}
        partner={synastry.partner}
        tableP={partnerTable4}
        startP={33 + ageMeetP}
      />
              </>
  }
]
}

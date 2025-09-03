import { PDFComponentProps, PDFPageConfig } from '../types/pdf.types';
import React from 'react';
import {
  DestinityNumericalValues, DestinityTable
} from '..';

import nameImage from '../assets/destinity-table.jpg';
import nameImage2 from '../assets/destinity-table2.jpg';

export const DestinityPDF: React.FC<{ consultant, newDate }> = ({ consultant, newDate }) => {
  const table = consultant.getDestinityTable()
  const table1 = table.slice(0, 30);
  const table2 = table.slice(30, 60);
  const table3 = table.slice(60, 90);
  const nameCycles = consultant.calcNameCycles()
  const nameSubCycles = consultant.calcNameSubCycles()

  return [
    {
      bg: nameImage,
      children: (
        <>
          <DestinityTable consultant={consultant} newDate={newDate} nameCycles={nameCycles} nameSubCycles={nameSubCycles} table={table1} slice={0} start={0} />
          <DestinityTable consultant={consultant} newDate={newDate} nameCycles={nameCycles} nameSubCycles={nameSubCycles} table={table2} slice={1} start={30} />
        </>
      )
    },
    {
      bg: nameImage2,
      children: (
        <>
          <DestinityTable consultant={consultant} newDate={newDate} nameCycles={nameCycles} nameSubCycles={nameSubCycles} table={table3} slice={0} start={60} />
          <DestinityNumericalValues consultant={consultant} newDate={newDate} />
        </>
      )
    }
  ]
}

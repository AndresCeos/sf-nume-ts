import { PDFComponentProps, PDFPageConfig } from '../types/pdf.types';
import React from 'react';
import {
  NameActive, NameBalance, NameCycle, NameFrequencyPotential, NameInhabitants, NamePotential,
  NameTable, NameValues
} from '..';

import nameImage from '../assets/name.jpg';
import nameImage2 from '../assets/name2.jpg';

export const NamePDF: React.FC<{ consultant, newDate }> = ({ consultant, newDate }) => {
  return [
    {
      bg: nameImage,
      children: <>
        <NameValues consultant={consultant} />
        <NamePotential consultant={consultant} />
        <NameTable consultant={consultant} />
        <NameActive consultant={consultant} />
        <NameInhabitants consultant={consultant} />
                </>
    },
    {
      bg: nameImage2,
      children: <>
        <NameCycle consultant={consultant} date={newDate} />
        <NameBalance consultant={consultant} />
        <NameFrequencyPotential consultant={consultant} />
                </>
    }
  ]
}

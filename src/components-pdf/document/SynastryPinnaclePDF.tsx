import { PDFComponentProps, PDFPageConfig } from '../types/pdf.types';
import React from 'react';
import { SynastryNames } from '../synastryPinnacle/SynastryNames';
import { SynastryData } from '../synastryVibrationTime/SynastryData';
import { SynastryPinnacles } from '../synastryPinnacle/SynastryPinnacles';
import { SynastryAnnualReturns } from '../synastryPinnacle/SynastryAnnualReturns';

import sPinnacle from '../assets/s-pinnacle.jpg'
export const SynastryPinnaclePDF: React.FC<{ synastry, newDate }> = ({ synastry, newDate }) => {
  return {
    bg: sPinnacle,
    children: <>
      <SynastryData synastry={synastry} newDate={newDate} />
      <SynastryNames synastry={synastry} newDate={newDate} />
      <SynastryPinnacles synastry={synastry} newDate={newDate} />
      <SynastryAnnualReturns synastry={synastry} newDate={newDate} />
              </>
  }
}
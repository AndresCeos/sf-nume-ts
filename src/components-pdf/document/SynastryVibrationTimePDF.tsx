import { PDFComponentProps, PDFPageConfig } from '../types/pdf.types';
import React from 'react';
import { SynastryData } from '../synastryVibrationTime/SynastryData';
import { SynastryEnergy } from '../synastryVibrationTime/SynastryEnergy';
import { SynastryLine } from '../synastryVibrationTime/SynastryLine';
import { SynastryNineCycle } from '../synastryVibrationTime/SynastryNineCycle';
import { SynastryTimeCurve } from '../synastryVibrationTime/SynastryTimeCurve';
import { SynastryVTQuaterM } from '../synastryVibrationTime/SynastryVTQuaterM';
import { SynastryVTQuarterY } from '../synastryVibrationTime/SynastryVTQuaterY';

import synastry1 from '../assets/s-time-vibration.jpg';
import synastry2 from '../assets/s-time-vibration2.jpg';

export const SynastryVibrationTimePDF: React.FC<{ synastry, newDate }> = ({ synastry, newDate }) => [{
  bg: synastry1,
  children: <>
    <SynastryData synastry={synastry} newDate={newDate} />
    <SynastryVTQuaterM synastry={synastry} newDate={newDate} />
    <SynastryEnergy synastry={synastry} newDate={newDate} />
    <SynastryNineCycle synastry={synastry} newDate={newDate} />
    <SynastryVTQuarterY synastry={synastry} newDate={newDate} />

            </>,
}, {
  bg: synastry2,
  children: <>
    <SynastryData synastry={synastry} newDate={newDate} />
    <SynastryTimeCurve synastry={synastry} newDate={newDate} />
    <SynastryLine synastry={synastry} newDate={newDate} />
            </>,

}];

import { PDFComponentProps, PDFPageConfig } from '../types/pdf.types';
import React from 'react';
import { AnnualReturnsVibration, VibrationTimeCycle, VibrationTimeQuarterM, VibrationTimeQuarterY, VibrationTimeStage } from '..';

import timeImage from '../assets/time_vibration.jpeg';


export const TimeVibrationPDF: React.FC<{ consultant, newDate }> = ({ consultant, newDate }) => {
  return {
    bg: timeImage,
    children: <>
      <VibrationTimeStage consultant={consultant} newDate={newDate} />
      <VibrationTimeQuarterM consultant={consultant} newDate={newDate} />
      <VibrationTimeCycle consultant={consultant} newDate={newDate} />
      <VibrationTimeQuarterY consultant={consultant} newDate={newDate} />
      <AnnualReturnsVibration consultant={consultant} newDate={newDate} />
      {/* @TODO: create copy of annual returns (name) for time vibration */}
              </>
  }
}

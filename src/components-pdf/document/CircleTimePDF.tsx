import { PDFComponentProps, PDFPageConfig } from '../types/pdf.types';
import React from 'react';
import { Circle } from '../circleTime/Circle'
import { MonthCircle } from '../circleTime/MonthCircle'

import circle from '../assets/circle_time.jpeg'

export const CircleTimePDF: React.FC<{ consultant, newDate }> = ({ consultant, newDate }) => {
  return {
    bg: circle,
    children: <>
      <Circle consultant={consultant} newDate={newDate} />
      <MonthCircle consultant={consultant} newDate={newDate} />
              </>
  }
}

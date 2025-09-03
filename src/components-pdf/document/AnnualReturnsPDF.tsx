import { PDFComponentProps, PDFPageConfig } from '../types/pdf.types';
import React from 'react';
import { AnnualReturns } from '../annualReturns/AnnualReturns'
import { TimeCicle } from '../annualReturns/TimeCicle'

import annualImage from '../assets/annual-returns.jpg'

export const AnnualReturnsPDF: React.FC<{ consultant, newDate }> = ({ consultant, newDate }) => {
  return {
    bg: annualImage,
    children: <>
      <AnnualReturns consultant={consultant} newDate={newDate} />
      <TimeCicle consultant={consultant} newDate={newDate} />
              </>
  }
}

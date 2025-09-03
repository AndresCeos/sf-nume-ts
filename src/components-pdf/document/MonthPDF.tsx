import { PDFComponentProps, PDFPageConfig } from '../types/pdf.types';
import React from 'react';
import { CalendarHeadMonth } from '../calendarMonth/CalendarHeadMonth'
import { CalendarMonth } from '../calendarMonth/CalendarMonth'

import calendar from '../assets/calendar-month.jpg'

export const MonthPDF: React.FC<{ consultant, newDate, month }> = ({ consultant, newDate, month }) => {
  return {
    bg: calendar,
    children: <>
      <CalendarHeadMonth consultant={consultant} newDate={newDate} />
      <CalendarMonth consultant={consultant} newDate={newDate} month={month} />
              </>
  }
}

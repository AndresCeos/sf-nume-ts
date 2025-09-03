import { PDFComponentProps, PDFPageConfig } from '../types/pdf.types';
import React from 'react';

import gVibration from '../assets/g-time-vibration.jpg'
import gVibration2 from '../assets/g-time-vibration2.jpg'
import { GroupData } from '../groupPinnacle/GroupData'
import { GroupCycle } from '../groupVibrationTime/GroupCycle'
import { GroupEnergy } from '../groupVibrationTime/GroupEnergy'
import { GroupLine } from '../groupVibrationTime/GroupLine'
import { GroupQuaterM } from '../groupVibrationTime/GroupQuaterM'
import { GroupQuaterY } from '../groupVibrationTime/GroupQuaterY'
import { GroupTimeCurve } from '../groupVibrationTime/GroupTimeCurve'



export const GroupVibrationTimePDF: React.FC<{ groupConsult, newDate }> = ({ groupConsult, newDate }) => {
  return [{
    bg: gVibration,
    children: <>
      <GroupData groupConsult={groupConsult} newDate={newDate} />
      <GroupEnergy groupConsult={groupConsult} newDate={newDate} />
      <GroupCycle groupConsult={groupConsult} newDate={newDate} />
      <GroupQuaterM groupConsult={groupConsult} newDate={newDate} />
      <GroupLine groupConsult={groupConsult} newDate={newDate} />
              </>
  }, {
    bg: gVibration2,
    children: <>
      <GroupData groupConsult={groupConsult} newDate={newDate} />
      <GroupQuaterY groupConsult={groupConsult} newDate={newDate} />
      <GroupTimeCurve groupConsult={groupConsult} newDate={newDate} />
              </>
  }]
}
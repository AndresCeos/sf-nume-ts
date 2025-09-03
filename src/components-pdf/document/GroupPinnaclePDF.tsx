import { PDFComponentProps, PDFPageConfig } from '../types/pdf.types';
import React from 'react';

import gPinnacle from '../assets/g-pinnacle.jpg'
import gPinnacle2 from '../assets/g-pinnacle2.jpg'
import { GroupData } from '../groupPinnacle/GroupData'
import { GroupPinacle1 } from '../groupPinnacle/GroupPinacle1'
import { GroupPinacle2 } from '../groupPinnacle/GroupPinacle2'
import { GroupPinacle3 } from '../groupPinnacle/GroupPinacle3'
import { GroupName1 } from '../groupPinnacle/GroupName1'
import { GroupName2 } from '../groupPinnacle/GroupName2'
import { GroupName3 } from '../groupPinnacle/GroupName3'
import { GroupRetornos1 } from '../groupPinnacle/GroupRetornos1'
import { GroupRetornos2 } from '../groupPinnacle/GroupRetornos2'
import { GroupRetornos3 } from '../groupPinnacle/GroupRetornos3'

export const GroupPinnaclePDF: React.FC<{ groupConsult, newDate }> = ({ groupConsult, newDate }) => {
  const cap = groupConsult.group

  let config = {
    bg: gPinnacle,
    children: <>
      <GroupData groupConsult={groupConsult} newDate={newDate} />
      <GroupName1 groupConsult={groupConsult} newDate={newDate} />
      <GroupPinacle1 groupConsult={groupConsult} newDate={newDate} />
      <GroupRetornos1 groupConsult={groupConsult} newDate={newDate} />
              </>
  };
  if (cap.length > 2) {
    config = [config, {
      bg: gPinnacle2,
      children: <>
        <GroupData groupConsult={groupConsult} newDate={newDate} />
        <GroupName2 groupConsult={groupConsult} newDate={newDate} />
        <GroupPinacle2 groupConsult={groupConsult} newDate={newDate} />
        <GroupRetornos2 groupConsult={groupConsult} newDate={newDate} />
                </>
    }]
  }
  if (cap.length > 5) {
    config = [...config, {
      bg: gPinnacle2,
      children: <>
        <GroupData groupConsult={groupConsult} newDate={newDate} />
        <GroupName3 groupConsult={groupConsult} newDate={newDate} />
        <GroupPinacle3 groupConsult={groupConsult} newDate={newDate} />
        <GroupRetornos3 groupConsult={groupConsult} newDate={newDate} />
                </>
    }]
  }
  return config;
}
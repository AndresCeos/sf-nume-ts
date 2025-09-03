import React from 'react';
import {
  CreateBreakdown, CreateName,
  CreateNumeric, CreatePinnacle, CreateTable, NameCycle,
} from '..';
import createName2 from '../assets/create-name-2.jpg';
import createName from '../assets/create-name.jpg';
import { AnnualReturns } from '../createName/AnnualReturns';

export const CreateNamePDF: React.FC<{ createNameObj, newDate }> = ({ createNameObj, newDate }) => [{
  bg: createName,
  children: <>
    <CreateName consultant={createNameObj} />
    <CreateNumeric consultant={createNameObj} />
    <CreateTable consultant={createNameObj} />
    <CreatePinnacle consultant={createNameObj} />
    <CreateBreakdown consultant={createNameObj} />
    <AnnualReturns consultant={createNameObj} />
  </>,
},
{
  bg: createName2,
  children: <NameCycle consultant={createNameObj} date={newDate} />,
}];

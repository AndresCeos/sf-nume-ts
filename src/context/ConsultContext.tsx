import moment from 'moment';
import { createContext } from 'react';

import Person from '@/resources/Person';

export interface ConsultContextInterface {
  consultant: Person | null;
  selectConsultant: (consultant: Api.Consultant) => void;
  consultationDate: moment.Moment;
  selectConsultationDate: (consultationDate: moment.Moment) => void;
  calculationDate: { day: number; month: number; year: number };
  calculationYear: number;
}

export const authContextDefaults: ConsultContextInterface = {
  consultant: null,
  selectConsultant: () => { },
  consultationDate: moment(),
  selectConsultationDate: () => { },
  calculationDate: { day: 0, month: 0, year: 0 },
  calculationYear: 0,
};

export const ConsultContext = createContext<ConsultContextInterface>(authContextDefaults);

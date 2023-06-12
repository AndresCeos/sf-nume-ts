import moment from 'moment';
import { createContext } from 'react';

export interface ConsultContextInterface {
  consultant: Api.Consultant;
  selectConsultant: (consultant: Api.Consultant) => void;
  consultationDate: moment.Moment;
  selectConsultationDate: (consultationDate: moment.Moment) => void;
  calculationDate: { day: number; month: number; year: number };
  calculationYear: number;
}

export const authContextDefaults: ConsultContextInterface = {
  consultant: {},
  selectConsultant: () => { },
  consultationDate: moment(),
  selectConsultationDate: () => { },
  calculationDate: { day: 0, month: 0, year: 0 },
  calculationYear: 0,
};

export const ConsultContext = createContext<ConsultContextInterface>(authContextDefaults);

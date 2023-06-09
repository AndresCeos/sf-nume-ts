import moment from 'moment';
import { createContext } from 'react';

export interface ConsultContextInterface {
  consultant: Api.Consultant;
  selectConsultant: (consultant: Api.Consultant) => void;
  consultationDate: moment.Moment;
  selectConsultationDate: (consultationDate: moment.Moment) => void;
}

export const authContextDefaults: ConsultContextInterface = {
  consultant: {},
  selectConsultant: () => { },
  consultationDate: moment(),
  selectConsultationDate: () => { },
};

export const ConsultContext = createContext<ConsultContextInterface>(authContextDefaults);

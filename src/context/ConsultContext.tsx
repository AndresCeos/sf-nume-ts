import moment from 'moment';
import { createContext } from 'react';

import Person from '@/resources/Person';

export interface ConsultContextInterface {
  consultant: Person | null;
  selectConsultant: (consultant: Api.Consultant) => void;
  selectConsultationDate: (consultationDate: moment.Moment) => void;
  consultationDate: moment.Moment; // Fecha de Consulta en formato moment
  calculationDate: { day: number; month: number; year: number }; // Fecha de Consulta en formato { day: number; month: number; year: number }
  calculationYear: number; // Año de Consulta
  isEditingConsultant: boolean;
  handleIsEditingConsultant: (isEditing: boolean) => void;
}

export const authContextDefaults: ConsultContextInterface = {
  consultant: null,
  selectConsultant: () => null,
  consultationDate: moment(),
  selectConsultationDate: () => null,
  calculationDate: { day: 0, month: 0, year: 0 },
  calculationYear: 0,
  isEditingConsultant: false,
  handleIsEditingConsultant: () => null,
};

export const ConsultContext = createContext<ConsultContextInterface>(authContextDefaults);

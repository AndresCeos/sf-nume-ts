import moment from 'moment';
import { useEffect, useReducer, useState } from 'react';

import {
  ConsultContext, ConsultContextInterface,
} from './ConsultContext';
import { consultReducer, types } from './ConsultReducer';

import Person from '@/resources/Person';

const INITIAL_STATE = {
  consultant: null,
  consultationDate: new Date(),
  calculationDate: { day: 0, month: 0, year: 0 },
  calculationYear: 0,
  isEditingConsultant: false,
};

function ConsultProvider({ children }: any) {
  const [consultState, dispatch] = useReducer(consultReducer, INITIAL_STATE);
  const [consultant, setConsultant] = useState<Person | null>(null);
  const [consultationDate, setConsultationDate] = useState<moment.Moment>(moment());

  const [calculationDate, setCalculationDate] = useState({
    day: Number(consultationDate.format('DD')),
    month: Number(consultationDate.format('MM')),
    year: Number(consultationDate.format('YYYY')),
  });

  const [calculationYear, setCalculationYear] = useState(Number(consultationDate.format('YYYY')));

  const selectConsultant = (newConsultant: Api.Consultant) => {
    if (!newConsultant) throw new Error('consultant is required');
    const newConsultantPerson = new Person({
      id: newConsultant.id || '',
      name: newConsultant.names || '',
      lastName: newConsultant.lastName || '',
      scdLastName: newConsultant.scdLastName || '',
      birthDate: newConsultant.date?.toString() || '',
    });
    setConsultant(newConsultantPerson);
    const action = { type: types.selectConsultant, consultant: newConsultant };
    dispatch(action);
  };

  useEffect(() => {
    setCalculationDate({
      day: Number(consultationDate.format('DD')),
      month: Number(consultationDate.format('MM')),
      year: Number(consultationDate.format('YYYY')),
    });
    setCalculationYear(Number(consultationDate.format('YYYY')));
  }, [consultationDate]);

  const handleIsEditingConsultant = (isEditing: boolean) => {
    dispatch({ type: types.isEditingConsultant, isEditing });
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value: ConsultContextInterface = {
    ...consultState,
    consultant,
    selectConsultant,
    consultationDate,
    selectConsultationDate: setConsultationDate,
    calculationDate,
    calculationYear,
    handleIsEditingConsultant,
  };

  return (
    <ConsultContext.Provider value={value}>
      {children}
    </ConsultContext.Provider>
  );
}

export default ConsultProvider;

import { format } from 'date-fns';
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
  const [consultationDate, setConsultationDate] = useState<Date>(new Date());

  const [calculationDate, setCalculationDate] = useState({
    day: Number(format(consultationDate, 'dd')),
    month: Number(format(consultationDate, 'MM')),
    year: Number(format(consultationDate, 'yyyy')),
  });

  const [calculationYear, setCalculationYear] = useState(Number(format(consultationDate, 'yyyy')));

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
      day: Number(format(consultationDate, 'dd')),
      month: Number(format(consultationDate, 'MM')),
      year: Number(format(consultationDate, 'yyyy')),
    });
    setCalculationYear(Number(format(consultationDate, 'yyyy')));
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

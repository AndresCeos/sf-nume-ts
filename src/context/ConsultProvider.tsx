import moment from 'moment';
import { useReducer, useState } from 'react';
import {
  ConsultContext, ConsultContextInterface,
} from './ConsultContext';
import { consultReducer, types } from './ConsultReducer';

const INITIAL_STATE = {
  consultant: {},
  consultationDate: new Date(),
};

function ConsultProvider({ children }: any) {
  const [consultState, dispatch] = useReducer(consultReducer, INITIAL_STATE);
  const [consultant, setConsultant] = useState<Api.Consultant>({});
  const [consultationDate, setConsultationDate] = useState<moment.Moment>(moment());

  const selectConsultant = (newConsultant: Api.Consultant) => {
    setConsultant(newConsultant);
    const action = { type: types.selectConsultant, consultant: newConsultant };
    dispatch(action);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value: ConsultContextInterface = {
    ...consultState,
    consultant,
    selectConsultant,
    consultationDate,
    selectConsultationDate: setConsultationDate,
  };

  return (
    <ConsultContext.Provider value={value}>
      {children}
    </ConsultContext.Provider>
  );
}

export default ConsultProvider;

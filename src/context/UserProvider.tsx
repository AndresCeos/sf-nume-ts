import { useReducer, useState } from 'react';
import {
  UserContext, UserContextInterface,
} from './UserContext';
import { types, userReducer } from './UserReducer';

const INITIAL_STATE = {
  consultant: {},
};

function UserProvider({ children }: any) {
  const [userState, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const [consultant, setConsultant] = useState<Api.Consultant>({});

  const selectConsultant = (newConsultant: Api.Consultant) => {
    setConsultant(newConsultant);
    const action = { type: types.selectConsultant, consultant: newConsultant };
    dispatch(action);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value: UserContextInterface = {
    ...userState,
    consultant,
    selectConsultant,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

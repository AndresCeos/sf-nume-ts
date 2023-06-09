import { createContext } from 'react';

export interface UserContextInterface {
  consultant: Api.Consultant;
  selectConsultant: (consultant: Api.Consultant) => void;
}

export const authContextDefaults: UserContextInterface = {
  consultant: {},
  selectConsultant: () => { },
};

export const UserContext = createContext<UserContextInterface>(authContextDefaults);

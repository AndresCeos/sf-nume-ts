import { createContext } from 'react';

export interface Consultant {
  id?: string;
  name: string;
  date: Date;
  selected?: boolean;
  order?: number;
}

export interface EnergyContextInterface {
  consultants: Consultant[];
  setConsultants: (consultants: Consultant[]) => void;
  selectConsultant: (consultantId: string) => void;
  updateConsultant: (consultant: Consultant) => void;
}

export const energyContextDefaults: EnergyContextInterface = {
  consultants: [],
  setConsultants: () => { },
  selectConsultant: () => { },
  updateConsultant: () => { },
};

export const EnergyContext = createContext<EnergyContextInterface>(energyContextDefaults);

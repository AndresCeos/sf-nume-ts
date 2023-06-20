import { createContext } from 'react';

export interface Consultant {
  id?: string;
  name: string;
  date: string;
  selected?: boolean;
  order?: number;
}

export interface EnergyContextInterface {
  consultants: Consultant[];
  fillConsultants: (consultants: Consultant[]) => void;
  consultantSelected?: Consultant;
  selectConsultant: (consultantId: string) => void;
  updateConsultant: (consultant: Partial<Consultant>) => void;
}

export const energyContextDefaults: EnergyContextInterface = {
  consultants: [],
  consultantSelected: undefined,
  fillConsultants: () => { },
  selectConsultant: () => { },
  updateConsultant: () => { },
};

export const EnergyContext = createContext<EnergyContextInterface>(energyContextDefaults);

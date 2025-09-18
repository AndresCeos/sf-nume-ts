import { createContext } from 'react';

export interface EnergyConsultant {
  id?: string;
  name: string;
  date: string;
  selected?: boolean;
  order?: number;
}

export interface EnergyContextInterface {
  consultants: EnergyConsultant[];
  fillConsultants: (consultants: EnergyConsultant[]) => void;
  consultantSelected?: EnergyConsultant;
  selectConsultant: (consultantId: string) => void;
  updateConsultant: (consultant: Partial<EnergyConsultant>) => void;
}

export const energyContextDefaults: EnergyContextInterface = {
  consultants: [],
  consultantSelected: undefined,
  fillConsultants: () => { },
  selectConsultant: () => { },
  updateConsultant: () => { },
};

export const EnergyContext = createContext<EnergyContextInterface>(energyContextDefaults);

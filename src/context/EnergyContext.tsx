import Group from '@/resources/Group';
import Person from '@/resources/Person';
import Synastry from '@/resources/Synastry';
import { createContext } from 'react';

export interface EnergyContextInterface {
  // Nuevo: manejo de selección activa para TimeCircle (solo tipos compatibles)
  activeSelection?: Person | Synastry | Group;
  setActiveSelection: (selection: Person | Synastry | Group | undefined) => void;
  selectedType?: 'universal' | 'person' | 'partner' | 'group';
  setSelectedType: (type: 'universal' | 'person' | 'partner' | 'group' | undefined) => void;
}

export const energyContextDefaults: EnergyContextInterface = {
  // Nuevo: valores por defecto para selección activa
  activeSelection: undefined,
  setActiveSelection: () => { },
  selectedType: undefined,
  setSelectedType: () => { },
};

export const EnergyContext = createContext<EnergyContextInterface>(energyContextDefaults);

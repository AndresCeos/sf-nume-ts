import Group from '@/resources/Group';
import Person from '@/resources/Person';
import Synastry from '@/resources/Synastry';
import { useCallback, useState } from 'react';
import { EnergyContext, EnergyContextInterface } from './EnergyContext';

function EnergyProvider({ children }: any) {
  // Nuevo: estado para manejo de selección activa
  const [activeSelection, setActiveSelectionState] = useState<Person | Synastry | Group | undefined>(undefined);
  const [selectedType, setSelectedTypeState] = useState<'universal' | 'person' | 'partner' | 'group' | undefined>(undefined);

  // Funciones para manejo de selección activa (estabilizadas con useCallback)
  const setActiveSelection = useCallback((selection: Person | Synastry | Group | undefined) => {
    setActiveSelectionState(selection);
  }, []);

  const setSelectedType = useCallback((type: 'universal' | 'person' | 'partner' | 'group' | undefined) => {
    setSelectedTypeState(type);
  }, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value: EnergyContextInterface = {
    // Nuevo: funciones de selección activa
    activeSelection,
    setActiveSelection,
    selectedType,
    setSelectedType,
  };

  return (
    <EnergyContext.Provider value={value}>
      {children}
    </EnergyContext.Provider>
  );
}

export default EnergyProvider;

import { useAuth } from '@/context/AuthProvider';
import Group from '@/resources/Group';
import Person from '@/resources/Person';
import Synastry from '@/resources/Synastry';
import { useCallback, useEffect, useState } from 'react';
import { EnergyContext, EnergyContextInterface } from './EnergyContext';

function EnergyProvider({ children }: any) {
  const { user: userAuth } = useAuth();

  // Crear userPerson por defecto
  const userPerson = new Person({
    id: userAuth?.user.id?.toString() || '',
    name: userAuth?.user.firstName || '',
    lastName: userAuth?.user.lastName || '',
    scdLastName: userAuth?.user.scdLastName || '',
    birthDate: userAuth?.user.birthDate?.toString() || '',
  });

  // Nuevo: estado para manejo de selección activa - inicializar con userPerson
  const [activeSelection, setActiveSelectionState] = useState<Person | Synastry | Group | undefined>(userPerson);
  const [selectedType, setSelectedTypeState] = useState<'universal' | 'person' | 'partner' | 'group' | undefined>('person');

  // Funciones para manejo de selección activa (estabilizadas con useCallback)
  const setActiveSelection = useCallback((selection: Person | Synastry | Group | undefined) => {
    setActiveSelectionState(selection);
  }, []);

  const setSelectedType = useCallback((type: 'universal' | 'person' | 'partner' | 'group' | undefined) => {
    setSelectedTypeState(type);
  }, []);

  // Actualizar userPerson cuando cambie la información del usuario
  useEffect(() => {
    const updatedUserPerson = new Person({
      id: userAuth?.user.id?.toString() || '',
      name: userAuth?.user.firstName || '',
      lastName: userAuth?.user.lastName || '',
      scdLastName: userAuth?.user.scdLastName || '',
      birthDate: userAuth?.user.birthDate?.toString() || '',
    });

    // Solo actualizar si no hay una selección activa o si la selección actual es la persona por defecto
    if (!activeSelection || (activeSelection instanceof Person && activeSelection.id === updatedUserPerson.id)) {
      setActiveSelectionState(updatedUserPerson);
    }
  }, [userAuth, activeSelection]);

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

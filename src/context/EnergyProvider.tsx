import { useEffect, useState } from 'react';
import { EnergyContext, EnergyContextInterface } from './EnergyContext';

function EnergyProvider({ children }: any) {
  const [guestEnergy, setGuestEnergyState] = useState<Api.GuestEnergy | undefined>(undefined);

  // Cargar guestEnergy desde localforage al inicializar
  useEffect(() => {
    const loadGuestEnergy = async () => {
      try {
        const { default: localforage } = await import('localforage');
        const storedGuestEnergy = await localforage.getItem<Api.GuestEnergy>('guestEnergy');
        if (storedGuestEnergy) {
          setGuestEnergyState(storedGuestEnergy);
        }
      } catch (error) {
        console.error('Error loading guestEnergy from localforage:', error);
      }
    };

    loadGuestEnergy();
  }, []);

  const setGuestEnergy = async (guestEnergyData: Api.GuestEnergy) => {
    try {
      const { default: localforage } = await import('localforage');
      setGuestEnergyState(guestEnergyData);
      await localforage.setItem('guestEnergy', guestEnergyData);
    } catch (error) {
      console.error('Error saving guestEnergy to localforage:', error);
    }
  };

  const updateGuestEnergy = async (updatedData: Partial<Api.GuestEnergy>) => {
    if (!guestEnergy) return;

    try {
      const { default: localforage } = await import('localforage');
      const updatedGuestEnergy = { ...guestEnergy, ...updatedData };
      setGuestEnergyState(updatedGuestEnergy);
      await localforage.setItem('guestEnergy', updatedGuestEnergy);
    } catch (error) {
      console.error('Error updating guestEnergy in localforage:', error);
    }
  };

  const clearGuestEnergy = async () => {
    try {
      const { default: localforage } = await import('localforage');
      setGuestEnergyState(undefined);
      await localforage.removeItem('guestEnergy');
    } catch (error) {
      console.error('Error clearing guestEnergy from localforage:', error);
    }
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value: EnergyContextInterface = {
    guestEnergy,
    setGuestEnergy,
    updateGuestEnergy,
    clearGuestEnergy,
  };

  return (
    <EnergyContext.Provider value={value}>
      {children}
    </EnergyContext.Provider>
  );
}

export default EnergyProvider;

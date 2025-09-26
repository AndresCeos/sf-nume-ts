import { createContext } from 'react';

export interface EnergyContextInterface {
  guestEnergy?: Api.GuestEnergy;
  setGuestEnergy: (guestEnergy: Api.GuestEnergy) => void;
  updateGuestEnergy: (guestEnergy: Partial<Api.GuestEnergy>) => void;
  clearGuestEnergy: () => void;
}

export const energyContextDefaults: EnergyContextInterface = {
  guestEnergy: undefined,
  setGuestEnergy: () => { },
  updateGuestEnergy: () => { },
  clearGuestEnergy: () => { },
};

export const EnergyContext = createContext<EnergyContextInterface>(energyContextDefaults);

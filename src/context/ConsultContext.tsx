import { createContext } from 'react';

import Person from '@/resources/Person';

export interface ConsultContextInterface {
  consultant: Person | null;
  activeConsultant: Api.Consultant | null;
  selectConsultant: (consultant: Api.Consultant) => void;
  selectActiveConsultant: (consultant: Api.Consultant) => void;
  isEditingConsultant: boolean;
  handleIsEditingConsultant: (isEditing: boolean) => void;
  // Date management
  selectConsultationDate: (consultationDate: Date) => void;
  consultationDate: Date; // Fecha de Consulta en formato Date
  calculationDate: { day: number; month: number; year: number }; // Fecha de Consulta en formato { day: number; month: number; year: number }
  calculationYear: number; // Año de Consulta

  // Partner management
  activePartner: Person | null;
  selectActivePartner: (partner: Api.Partner) => void;
  updateUserPartnerActive:(activePartnerId: string) => void;
  updateConsultantPartners: (consultant: Api.Consultant) => void;
  partnersAvailable: Api.Partner[];
  // Group management
  groupsAvailable: Api.GroupData[];
  activeGroup: Api.GroupData | null;
  selectedGroup: Person[];
  isEditingGroup: boolean;
  setIsEditingGroup: (isEditing: boolean) => void;
  selectActiveGroup: (group: Api.GroupData) => void;
  setSelectedGroup: (group: Person[]) => void;
  createGroup: (groupData: Omit<Api.GroupData, 'id' | 'members'>) => void;
  updateConsultantGroups: (consultant: Api.Consultant) => void;

}

// Memoize default values to prevent unnecessary re-creation
const createDefaultValues = (): ConsultContextInterface => ({
  consultant: null,
  activeConsultant: null,
  selectConsultant: () => null,
  selectActiveConsultant: () => null,
  consultationDate: new Date(),
  selectConsultationDate: () => null,
  calculationDate: { day: 0, month: 0, year: 0 },
  calculationYear: 0,
  isEditingConsultant: false,
  handleIsEditingConsultant: () => null,
  activePartner: null,
  selectActivePartner: () => null,
  updateUserPartnerActive: () => null,
  updateConsultantPartners: () => null,
  partnersAvailable: [],
  // Group management defaults
  selectedGroup: [],
  setSelectedGroup: () => null,
  isEditingGroup: false,
  setIsEditingGroup: () => null,
  groupsAvailable: [],
  activeGroup: null,
  selectActiveGroup: () => null,
  createGroup: () => null,
  updateConsultantGroups: () => null,
});

export const authContextDefaults = createDefaultValues();

export const ConsultContext = createContext<ConsultContextInterface>(authContextDefaults);

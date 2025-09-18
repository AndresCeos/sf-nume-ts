import { useState } from 'react';
import { EnergyConsultant, EnergyContext, EnergyContextInterface } from './EnergyContext';

function EnergyProvider({ children }: any) {
  const [consultants, setConsultants] = useState<EnergyConsultant[]>([]);
  const [consultantSelected, setConsultantSelected] = useState<EnergyConsultant | undefined>(undefined);

  const fillConsultants = (consultantsToSet: EnergyConsultant[]) => {
    setConsultants(consultantsToSet);
    setConsultantSelected(consultantsToSet[0]);
  };

  const selectConsultant = (consultantId: string) => {
    const consultantsToSet = consultants.map((c) => ({ ...c, selected: false }));
    const consultantToSet = consultantsToSet.find((consultantToFind) => consultantToFind.id === consultantId);
    if (consultantToSet) {
      consultantToSet.selected = true;
    }
    setConsultants(consultantsToSet);
    setConsultantSelected(consultantToSet);
  };

  const updateConsultant = (consultant: Partial<EnergyConsultant>) => {
    const consultantsToSet = consultants.map((c) => ({ ...c, selected: false }));
    const consultantToSet = consultantsToSet.find((consultantToFind) => consultantToFind.id === consultant.id);
    if (consultantToSet) {
      consultantToSet.name = consultant?.name || '';
      consultantToSet.date = consultant.date || '';
      consultantToSet.selected = true;
    }
    setConsultants(consultantsToSet);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value: EnergyContextInterface = {
    consultants,
    consultantSelected,
    fillConsultants,
    selectConsultant,
    updateConsultant,
  };

  return (
    <EnergyContext.Provider value={value}>
      {children}
    </EnergyContext.Provider>
  );
}

export default EnergyProvider;

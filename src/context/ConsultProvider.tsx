import { format } from 'date-fns';
import { useEffect, useReducer, useState } from 'react';

import {
  ConsultContext, ConsultContextInterface,
} from './ConsultContext';
import { consultReducer, types } from './ConsultReducer';

import Person from '@/resources/Person';

const INITIAL_STATE = {
  consultant: null,
  activeConsultant: null,
  consultationDate: new Date(),
  calculationDate: { day: 0, month: 0, year: 0 },
  calculationYear: 0,
  isEditingConsultant: false,
  activePartner: null,
  groupsAvailable: [],
  activeGroup: null,
  isEditingGroup: false,
  setIsEditingGroup: () => null,
};

function ConsultProvider({ children }: any) {
  const [consultState, dispatch] = useReducer(consultReducer, INITIAL_STATE);
  const [consultant, setConsultant] = useState<Person | null>(null);
  const [activeConsultant, setActiveConsultant] = useState<Api.Consultant | null>(null);
  const [consultationDate, setConsultationDate] = useState<Date>(new Date());
  const [activePartner, setActivePartner] = useState<Person | null>(null);
  const [partnersAvailable, setPartnersAvailable] = useState<Api.Partner[]>([]);
  const [calculationDate, setCalculationDate] = useState({
    day: Number(format(consultationDate, 'dd')),
    month: Number(format(consultationDate, 'MM')),
    year: Number(format(consultationDate, 'yyyy')),
  });

  const [calculationYear, setCalculationYear] = useState(Number(format(consultationDate, 'yyyy')));

  // Group management state
  const [groupsAvailable, setGroupsAvailable] = useState<Api.GroupData[]>([]);
  const [activeGroup, setActiveGroup] = useState<Api.GroupData | null>(null);
  const [isEditingGroup, setIsEditingGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Person[]>([]);

  const selectConsultant = (newConsultant: Api.Consultant) => {
    if (!newConsultant) throw new Error('consultant is required');

    const newConsultantPerson = new Person({
      id: newConsultant.id || '',
      name: newConsultant.names || '',
      lastName: newConsultant.lastName || '',
      scdLastName: newConsultant.scdLastName || '',
      birthDate: newConsultant.date?.toString() || '',
    });
    setConsultant(newConsultantPerson);
    setActiveConsultant(newConsultant);

    // Assign partners from the consultant or empty array if none
    setPartnersAvailable(newConsultant.partner as Api.Partner[] || []);

    // Load group data from consultant
    setGroupsAvailable(newConsultant.groupData || []);
    setActiveGroup(null);

    const action = { type: types.selectConsultant, consultant: newConsultant };
    dispatch(action);
  };

  const selectActiveConsultant = (newActiveConsultant: Api.Consultant) => {
    setActiveConsultant(newActiveConsultant);
    // Actualizar también la lista de partners disponibles
    setPartnersAvailable(newActiveConsultant.partner || []);
    // Load group data from consultant
    setGroupsAvailable(newActiveConsultant.groupData || []);
  };

  const selectActivePartner = (newPartner: Api.Partner) => {
    if (!newPartner) throw new Error('partner is required');

    // Si el partner tiene id vacío, limpiar la selección
    if (!newPartner.id) {
      setActivePartner(null);
      return;
    }

    const newPartnerPerson = new Person({
      id: newPartner.id || '',
      name: newPartner.names || '',
      lastName: newPartner.lastName || '',
      scdLastName: newPartner.scdLastName || '',
      birthDate: newPartner.date?.toString() || '',
      yearMet: newPartner.yearMeet || 0,
    });

    setActivePartner(newPartnerPerson);
    const action = { type: types.selectConsultant, consultant: newPartner };
    dispatch(action);
  };

  const updateUserPartnerActive = (activePartnerId: string) => {
    const newPartner: Api.Partner | undefined = activeConsultant?.partner?.find((p:Api.Partner) => p.id === activePartnerId);
    if (newPartner) {
      selectActivePartner(newPartner);
      // Actualizar también la lista de partners disponibles
      setPartnersAvailable(activeConsultant?.partner || []);
    }
  };

  const updateConsultantPartners = (updatedConsultant: Api.Consultant) => {
    setActiveConsultant(updatedConsultant);
    setPartnersAvailable(updatedConsultant.partner || []);
  };

  // Group management functions
  const selectActiveGroup = (group: Api.GroupData | null) => {
    if (!group) {
      setActiveGroup(null);
      return;
    }
    if (group.members?.length === 0) {
      setActiveGroup(null);
    } else {
      const membersPerson = group.members?.map((member) => new Person({
        id: member.id,
        name: member.name,
        lastName: member.lastName,
        scdLastName: member.scdLastName,
        birthDate: member.date,
      }));
      setSelectedGroup(membersPerson as Person[]);
    }
    setActiveGroup(group);
    const action = { type: types.selectConsultant, consultant: group };
    dispatch(action);
  };

  const createGroup = (groupDataInput: Api.GroupData) => {
    setGroupsAvailable([...groupsAvailable, groupDataInput]);
  };

  useEffect(() => {
    setCalculationDate({
      day: Number(format(consultationDate, 'dd')),
      month: Number(format(consultationDate, 'MM')),
      year: Number(format(consultationDate, 'yyyy')),
    });
    setCalculationYear(Number(format(consultationDate, 'yyyy')));
  }, [consultationDate]);

  const handleIsEditingConsultant = (isEditing: boolean) => {
    dispatch({ type: types.isEditingConsultant, isEditing });
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value: ConsultContextInterface = {
    ...consultState,
    consultant,
    activeConsultant,
    selectConsultant,
    selectActiveConsultant,
    consultationDate,
    selectConsultationDate: setConsultationDate,
    calculationDate,
    calculationYear,
    handleIsEditingConsultant,
    activePartner,
    selectActivePartner,
    partnersAvailable,
    updateUserPartnerActive,
    updateConsultantPartners,
    // Group management
    groupsAvailable,
    activeGroup,
    isEditingGroup,
    setIsEditingGroup,
    selectActiveGroup,
    createGroup,
    selectedGroup,
    setSelectedGroup,
  };

  return (
    <ConsultContext.Provider value={value}>
      {children}
    </ConsultContext.Provider>
  );
}

export default ConsultProvider;

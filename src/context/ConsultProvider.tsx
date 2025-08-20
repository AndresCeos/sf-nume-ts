import { format } from 'date-fns';
import {
  useCallback, useMemo, useReducer, useState,
} from 'react';

import { ConsultContext, ConsultContextInterface } from './ConsultContext';
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

  // Memoize calculationDate to prevent unnecessary recalculations
  const calculationDate = useMemo(() => ({
    day: Number(format(consultationDate, 'dd')),
    month: Number(format(consultationDate, 'MM')),
    year: Number(format(consultationDate, 'yyyy')),
  }), [consultationDate]);

  // Memoize calculationYear
  const calculationYear = useMemo(
    () => Number(format(consultationDate, 'yyyy')),
    [consultationDate],
  );

  // Group management state
  const [groupsAvailable, setGroupsAvailable] = useState<Api.GroupData[]>([]);
  const [activeGroup, setActiveGroup] = useState<Api.GroupData | null>(null);
  const [isEditingGroup, setIsEditingGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Person[]>([]);

  // Memoize selectConsultant function
  const selectConsultant = useCallback((newConsultant: Api.Consultant) => {
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
  }, []);

  // Memoize selectActiveConsultant function
  const selectActiveConsultant = useCallback((newActiveConsultant: Api.Consultant) => {
    setActiveConsultant(newActiveConsultant);
    // Actualizar también la lista de partners disponibles
    setPartnersAvailable(newActiveConsultant.partner || []);
    // Load group data from consultant
    setGroupsAvailable(newActiveConsultant.groupData || []);
  }, []);

  // Memoize selectActivePartner function
  const selectActivePartner = useCallback((newPartner: Api.Partner) => {
    if (!newPartner) throw new Error('partner is required');

    // Si el partner tiene id vacío, limpiar la selección
    if (!newPartner.id) {
      setActivePartner(null);
      return;
    }

    // Buscar la versión más actualizada del partner en partnersAvailable
    const updatedPartner = partnersAvailable.find((p) => p.id === newPartner.id) || newPartner;

    const newPartnerPerson = new Person({
      id: updatedPartner.id || '',
      name: updatedPartner.names || '',
      lastName: updatedPartner.lastName || '',
      scdLastName: updatedPartner.scdLastName || '',
      birthDate: updatedPartner.date?.toString() || '',
      yearMet: updatedPartner.yearMeet || 0,
    });

    setActivePartner(newPartnerPerson);
    const action = { type: types.selectConsultant, consultant: updatedPartner };
    dispatch(action);
  }, [partnersAvailable, dispatch]);

  // Memoize updateUserPartnerActive function
  const updateUserPartnerActive = useCallback((activePartnerId: string) => {
    const newPartner: Api.Partner | undefined = activeConsultant?.partner?.find((p:Api.Partner) => p.id === activePartnerId);
    if (newPartner) {
      selectActivePartner(newPartner);
      // Actualizar también la lista de partners disponibles
      setPartnersAvailable(activeConsultant?.partner || []);
    }
  }, [activeConsultant, selectActivePartner]);

  // Memoize updateConsultantPartners function
  const updateConsultantPartners = useCallback((updatedConsultant: Api.Consultant) => {
    setActiveConsultant(updatedConsultant);
    setPartnersAvailable(updatedConsultant.partner || []);
    // También actualizar grupos disponibles
    setGroupsAvailable(updatedConsultant.groupData || []);

    // Si hay un partner activo, actualizarlo también
    if (activePartner) {
      const updatedActivePartner = updatedConsultant.partner?.find((p) => p.id === activePartner.id);
      console.log('Debug - updatedActivePartner found:', updatedActivePartner);
      if (updatedActivePartner) {
        const updatedPartnerPerson = new Person({
          id: updatedActivePartner.id || '',
          name: updatedActivePartner.names || '',
          lastName: updatedActivePartner.lastName || '',
          scdLastName: updatedActivePartner.scdLastName || '',
          birthDate: updatedActivePartner.date?.toString() || '',
          yearMet: updatedActivePartner.yearMeet || 0,
        });
        console.log('Debug - setting new activePartner:', updatedPartnerPerson);
        setActivePartner(updatedPartnerPerson);
      }
    }
  }, [activePartner]);

  // Memoize updateConsultantGroups function
  const updateConsultantGroups = useCallback((updatedConsultant: Api.Consultant) => {
    setActiveConsultant(updatedConsultant);
    setGroupsAvailable(updatedConsultant.groupData || []);

    // Si hay un grupo activo, actualizarlo también
    if (activeGroup) {
      const updatedActiveGroup = updatedConsultant.groupData?.find((g) => g.id === activeGroup.id);
      if (updatedActiveGroup) {
        setActiveGroup(updatedActiveGroup);
        if (updatedActiveGroup.members?.length === 0) {
          setSelectedGroup([]);
        } else {
          const membersPerson = updatedActiveGroup.members?.map((member) => new Person({
            id: member.id,
            name: member.name,
            lastName: member.lastName,
            scdLastName: member.scdLastName,
            birthDate: member.date,
          }));
          setSelectedGroup(membersPerson as Person[]);
        }
      }
    }
  }, [activeGroup]);

  // Memoize selectActiveGroup function
  const selectActiveGroup = useCallback((group: Api.GroupData | null) => {
    if (!group || !group.id) {
      setActiveGroup(null);
      setSelectedGroup([]);
      return;
    }

    // Buscar el grupo actualizado en groupsAvailable
    const updatedGroup = groupsAvailable.find((g) => g.id === group.id) || group;

    if (updatedGroup.members?.length === 0) {
      setSelectedGroup([]);
    } else {
      const membersPerson = updatedGroup.members?.map((member) => new Person({
        id: member.id,
        name: member.name,
        lastName: member.lastName,
        scdLastName: member.scdLastName,
        birthDate: member.date,
      }));
      setSelectedGroup(membersPerson as Person[]);
    }
    setActiveGroup(updatedGroup);
    const action = { type: types.selectConsultant, consultant: updatedGroup };
    dispatch(action);
  }, [groupsAvailable, dispatch]);

  // Memoize createGroup function
  const createGroup = useCallback((groupDataInput: Omit<Api.GroupData, 'id' | 'members'>) => {
    const newGroup: Api.GroupData = {
      ...groupDataInput,
      id: Math.random().toString(36).substring(2, 9),
      members: [],
    };
    setGroupsAvailable((prevGroups) => [...prevGroups, newGroup]);
  }, []);

  // Memoize handleIsEditingConsultant function
  const handleIsEditingConsultant = useCallback((isEditing: boolean) => {
    dispatch({ type: types.isEditingConsultant, isEditing });
  }, []);

  // Memoize setIsEditingGroup function
  const handleSetIsEditingGroup = useCallback((isEditing: boolean) => {
    setIsEditingGroup(isEditing);
  }, []);

  // Memoize setSelectedGroup function
  const handleSetSelectedGroup = useCallback((group: Person[]) => {
    setSelectedGroup(group);
  }, []);

  // Memoize the entire context value to prevent unnecessary re-renders
  const value: ConsultContextInterface = useMemo(() => ({
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
    setIsEditingGroup: handleSetIsEditingGroup,
    selectActiveGroup,
    createGroup,
    selectedGroup,
    setSelectedGroup: handleSetSelectedGroup,
    updateConsultantGroups,
  }), [
    consultState,
    consultant,
    activeConsultant,
    selectConsultant,
    selectActiveConsultant,
    consultationDate,
    calculationDate,
    calculationYear,
    handleIsEditingConsultant,
    activePartner,
    selectActivePartner,
    partnersAvailable,
    updateUserPartnerActive,
    updateConsultantPartners,
    groupsAvailable,
    activeGroup,
    isEditingGroup,
    handleSetIsEditingGroup,
    selectActiveGroup,
    createGroup,
    selectedGroup,
    handleSetSelectedGroup,
    updateConsultantGroups,
  ]);

  return (
    <ConsultContext.Provider value={value}>
      {children}
    </ConsultContext.Provider>
  );
}

export default ConsultProvider;

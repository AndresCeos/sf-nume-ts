export const types = {
  selectConsultant: 'Consult/consultant',
  isEditingConsultant: 'Consult/isEditingConsultant',
  addConsultant: 'Consult/consultants',
};

export const consultReducer = (state: any, action: any) => {
  switch (action.type) {
    case types.selectConsultant:
      return {
        ...state,
        consultant: action.consultant,
      };
    case types.isEditingConsultant:
      return {
        ...state,
        isEditingConsultant: action.isEditing,
      };
    case types.addConsultant:
      return {
        ...state,
        consultants: action.consultants,
      };
    default:
      return state;
  }
};

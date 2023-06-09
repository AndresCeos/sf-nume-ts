export const types = {
  selectConsultant: 'Consult/consultant',
};

export const consultReducer = (state: any, action: any) => {
  switch (action.type) {
    case types.selectConsultant:
      return {
        ...state,
        consultant: action.consultant,
      };
    default:
      return state;
  }
};

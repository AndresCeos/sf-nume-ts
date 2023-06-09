export const types = {
  selectConsultant: 'User/consultant',
};

export const userReducer = (state: any, action: any) => {
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

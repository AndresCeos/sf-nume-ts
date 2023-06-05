export const types = {
  login: 'Auth/login',
  logout: 'Auth/logout',
  languageChange: 'Auth/language',
  setupReimbursementMethod: 'Auth/setupReimbursementMethod',
  setupPhoneNumber: 'Auth/setupPhoneNumber',
  updateProfile: 'Auth/updateProfile',
};

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        user: {
          token: action.token,
          firstName: action.firstName,
          lastName: action.lastName,
          scdLastName: action.scdLastName,
          photoURL: action.photoURL,
          birthDate: action.birthDate,
          email: action.email,
          company: action.company,
          telephone: action.telephone,
          phoneNumber: action.phoneNumber,
          address: action.address,
          website: action.website,
          logoURL: action.logoURL,
          appVersion: action.appVersion,
          license: action.license,
        },
        isLoggedIn: true,
      };
    case types.updateProfile:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.user,
        },
      };
    case types.languageChange:
      return {
        ...state,
        user: {
          ...state.user,
          userPreferences: {
            language: action.language,
          },
        },
      };
    case types.logout:
      return {
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

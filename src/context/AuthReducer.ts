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
          firstName: action.user_first_name,
          lastName: action.user_last_name,
          scdLastName: action.user_scd_last_name,
          photoURL: action.photoURL,
          birthDate: action.birthDate,
          email: action.user_email,
          company: action.user_company,
          telephone: action.user_phone,
          phoneNumber: action.company_phone,
          address: action.company_direction,
          website: action.company_website,
          logoURL: action.company_logo,
          appVersion: action.app_version,
          license: action.licence_id,
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

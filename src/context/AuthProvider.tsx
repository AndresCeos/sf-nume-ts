import { useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  // eslint-disable-next-line @typescript-eslint/comma-dangle
  AuthContext, AuthContextInterface, User
} from './AuthContext';
import { authReducer, types } from './AuthReducer';

import { apiGet, apiPost } from '@/api/index';
import Loader from '@/components/Loader';

const INITIAL_STATE = {
  isLoading: true,
  isLoggedIn: false,
};

function AuthProvider({ children }: any) {
  const [authState, dispatch] = useReducer(authReducer, INITIAL_STATE);
  const [loading, setLoading] = useState<boolean>(true);
  const { i18n } = useTranslation();

  const handleLogin = (login: User) => {
    const action = { type: types.login, ...login };
    dispatch(action);
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setLoading(false);
      return;
    }
    apiPost('/wp-json/app/v1/validate').then((res) => {
      if (res.status === 200) {
        let language = 'fr';
        if (res.data.signedIn !== false) {
          handleLogin({
            token: res.data.token,
            firstName: res.data.user_first_name,
            lastName: res.data.user_last_name,
            scdLastName: res.data.user_scd_last_name,
            photoURL: res.data.photoURL,
            birthDate: res.data.birthDate,
            email: res.data.user_email,
            company: res.data.user_company,
            telephone: res.data.user_phone,
            phoneNumber: res.data.company_phone,
            address: res.data.company_direction,
            website: res.data.company_website,
            logoURL: res.data.company_logo,
            appVersion: res.data.app_version,
            license: res.data.license_id,
          });
          language = res.data.userPreferences.language;
        }
        i18n.changeLanguage(language);
      }
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    await apiPost('/user/signOut');
    const action = { type: types.logout };
    dispatch(action);
  };

  const handleUpdateProfile = async () => {
    const response = await apiGet('/user/signedIn').then((res: Api.Response) => res);
    const login = response.data as User;
    handleLogin({ ...login });
  };

  const handleLanguageChange = (language: string) => {
    const action = { type: types.languageChange, language };
    dispatch(action);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value: AuthContextInterface = {
    ...authState,
    handleLogin,
    handleLogout,
    handleLanguageChange,
    handleUpdateProfile,
  };

  if (loading) {
    return (
      <AuthContext.Provider value={value}>
        <Loader />
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

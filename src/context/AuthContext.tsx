import { createContext } from 'react';

export interface UserPreferences {
  language: 'fr' | 'en';
}

export interface LoginData {
  token: string;
  firstName: string;
  lastName: string;
  scdLastName: string;
  photoURL: string;
  birthDate: Date;
  email: string;
  company: string;
  telephone: string;
  phoneNumber: string;
  address: string;
  website: string;
  logoURL: string;
  appVersion: string;
  license: string;
}

export interface AuthContextInterface {
  readonly isLoggedIn: boolean;
  user: LoginData;
  handleLogin: (login: LoginData) => void;
  handleLogout: () => Promise<unknown>;
  handleLanguageChange: (language: string) => void;
  handleUpdateProfile: () => Promise<unknown>;
}

export const authContextDefaults: AuthContextInterface = {
  isLoggedIn: false,
  user: {} as never,
  handleLogin: () => null,
  handleLogout: () => Promise.resolve(),
  handleLanguageChange: () => null,
  handleUpdateProfile: () => Promise.resolve(),
};

export const AuthContext = createContext<AuthContextInterface>(authContextDefaults);

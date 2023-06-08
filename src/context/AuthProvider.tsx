import { initReactQueryAuth } from 'react-query-auth';

import axios from '@/api/axios';
import LoaderComponent from '@/components/LoaderComponent';
import storage from '@/utils/storage';

async function handleUserResponse(response: Api.UserResponse) {
  storage.setToken(response.token);
  return response;
}

const getUser = (): Promise<Api.UserResponse> => axios.post('/wp-json/app/v2/auth/me');

async function loadUser() {
  if (storage.getToken()) {
    const data = await getUser();
    return data;
  }
  return null;
}

type LoginCredentialsDTO = {
  username: string;
  password: string;
};

const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<Api.UserResponse> => axios.post('/wp-json/app/v2/auth/login', data);

async function loginFn(data: LoginCredentialsDTO) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data: LoginCredentialsDTO) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return <LoaderComponent />;
  },
};

export const { AuthProvider, useAuth } = initReactQueryAuth<Api.UserResponse | null, unknown, LoginCredentialsDTO>(authConfig);

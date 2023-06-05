import axios from 'axios';
import env from '../utils/constants';

const instance = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const apiPost = async (path: string, data?: any): Promise<Api.Response> => {
  const url = new URL(path, env.VITE_API_URL).toString();
  return instance.post(url, data).then((response) => ({
    status: response.status,
    data: response.data,
  } as Api.Response)).catch((err) => {
    throw err;
  });
};

export const apiPut = async (path: string, data?: any): Promise<Api.Response> => {
  const url = new URL(path, env.VITE_API_URL).toString();
  return instance.put(url, data).then((response) => ({
    status: response.status,
    data: response.data,
  } as Api.Response)).catch((err) => {
    throw err;
  });
};

export const apiGet = async (path: string, data?: any): Promise<Api.Response> => {
  const url = new URL(path, env.VITE_API_URL).toString();
  return instance.get(url, data).then((response) => ({
    status: response.status,
    data: response.data,
  } as Api.Response));
};

export const apiDelete = async (path: string, data?: any): Promise<Api.Response> => {
  const url = new URL(path, env.VITE_API_URL).toString();
  return instance.delete(url, data).then((response) => ({
    status: response.status,
    data: response.data,
  } as Api.Response)).catch((err) => {
    throw err;
  });
};

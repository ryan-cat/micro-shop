import { refreshTokens, logOut } from './../store/actions/auth-actions';
import { RootState } from './../store/index';
import { configure } from 'axios-hooks';
import axios, { AxiosError } from 'axios';
import store from '../store';
import { REFRESH_TOKEN } from '../store/types/auth-types';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const getAccessToken = async (): Promise<string | null> => {
  const rootState: RootState = store.getState();
  const accessToken = rootState.auth.accessToken;

  if (accessToken) {
    return accessToken;
  } else {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if (refreshToken) {
      const res = await fetch(process.env.REACT_APP_API_URL + '/accounts/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refreshToken
        })
      });

      if (res.ok) {
        const data = await res.json();

        store.dispatch(refreshTokens(data.accessToken, data.refreshToken) as any);

        return data.accessToken;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (err: AxiosError) => {
    if (err.response?.status === 401) {
      store.dispatch(logOut() as any);
    } else {
      throw err;
    }
  }
);

configure({ axios: axiosInstance });

export default axiosInstance;

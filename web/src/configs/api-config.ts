import { refreshTokens } from './../store/actions/auth-actions';
import { RootState } from './../store/index';
import { configure } from 'axios-hooks';
import axios, { AxiosError } from 'axios';
import store from '../store';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

axiosInstance.interceptors.request.use((config) => {
  const state: RootState = store.getState();
  const token = state.auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (err: AxiosError) => {
    return new Promise(async (resolve, reject) => {
      const originalReq = err.config;

      // @ts-ignore
      if (err.response?.status === 401 && originalReq && !originalReq._retry) {
        // @ts-ignore
        originalReq._retry = true;

        const refreshToken = localStorage.getItem('token');
        if (!refreshToken) {
          // log out
        } else {
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

            originalReq.headers.Authorization = `Bearer ${data.accessToken}`;
            resolve(axios(originalReq));
          } else {
            if (res.status === 400) {
              console.log('logout');
            }
          }
        }
      }
      return reject(err);
    });
  }
);

configure({ axios: axiosInstance });

export default axiosInstance;

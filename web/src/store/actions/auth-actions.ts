import { AuthenticationResult } from './../../types/auth-types';
import { AuthActions } from '../types/auth-types';
import { Dispatch } from 'redux';

export const logIn = (response: AuthenticationResult) => (dispatch: Dispatch<AuthActions>) => {
  localStorage.setItem('token', response.refreshToken);

  dispatch({
    type: 'LOG_IN',
    user: response.user,
    accessToken: response.accessToken
  });
};

export const refreshTokens = (accessToken: string, refreshToken: string) => (dispatch: Dispatch<AuthActions>) => {
  localStorage.setItem('token', refreshToken);

  dispatch({
    type: 'REFRESH_ACCESS_TOKEN',
    accessToken
  });
};

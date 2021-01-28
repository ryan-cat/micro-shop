import { AuthenticationResult } from './../../types/auth-types';
import { AuthActions, REFRESH_TOKEN } from '../types/auth-types';
import { Dispatch } from 'redux';

export const logIn = (response: AuthenticationResult) => (dispatch: Dispatch<AuthActions>) => {
  localStorage.setItem(REFRESH_TOKEN, response.refreshToken);

  dispatch({
    type: 'LOG_IN',
    user: response.user,
    accessToken: response.accessToken
  });
};

export const refreshTokens = (accessToken: string, refreshToken: string) => (dispatch: Dispatch<AuthActions>) => {
  localStorage.setItem(REFRESH_TOKEN, refreshToken);

  dispatch({
    type: 'REFRESH_ACCESS_TOKEN',
    accessToken
  });
};

export const logOut = (manualLogOut: boolean = false) => (dispatch: Dispatch<AuthActions>) => {
  localStorage.removeItem(REFRESH_TOKEN);

  dispatch({
    type: 'LOG_OUT',
    manualLogOut
  });
};

export const resetManualLogOut = () => (dispatch: Dispatch<AuthActions>) => {
  dispatch({
    type: 'RESET_MANUAL_LOG_OUT'
  });
};

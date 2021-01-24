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

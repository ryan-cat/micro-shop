import { User } from './../../types/auth-types';
import { Action } from 'redux';

export const LOG_IN = 'LOG_IN';
export const REFRESH_ACCESS_TOKEN = 'REFRESH_ACCESS_TOKEN';
export const LOG_OUT = 'LOG_OUT';
export const RESET_MANUAL_LOG_OUT = 'RESET_MANUAL_LOG_OUT';

export const REFRESH_TOKEN = 'token';

export interface LogInAction extends Action<typeof LOG_IN> {
  user: User;
  accessToken: string;
}
export interface RefreshAccessTokenAction extends Action<typeof REFRESH_ACCESS_TOKEN> {
  accessToken: string;
}

export interface LogOutAction extends Action<typeof LOG_OUT> {
  manualLogOut: boolean;
}

export interface ResetManualLogOutAction extends Action<typeof RESET_MANUAL_LOG_OUT> {}

export type AuthActions = LogInAction | RefreshAccessTokenAction | LogOutAction | ResetManualLogOutAction;

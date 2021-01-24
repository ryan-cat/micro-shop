import { User } from './../../types/auth-types';
import { Action } from 'redux';

export const LOG_IN = 'LOG_IN';

export interface LogInAction extends Action<typeof LOG_IN> {
  user: User;
  accessToken: string;
}

export type AuthActions = LogInAction;

import { User } from '../../types/auth-types';
import { AuthActions } from '../types/auth-types';

export interface AuthState {
  user: User;
  isAuthenticated: boolean;
  accessToken: string | null;
  manualLogOut: boolean;
}

const initialState: AuthState = {
  user: {} as User,
  isAuthenticated: !!localStorage.getItem('token'),
  accessToken: null,
  manualLogOut: false
};

const authReducer = (state: AuthState = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
        accessToken: action.accessToken
      };
    case 'REFRESH_ACCESS_TOKEN':
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.accessToken
      };
    case 'LOG_OUT':
      return {
        ...state,
        user: {} as User,
        isAuthenticated: false,
        accessToken: null,
        manualLogOut: action.manualLogOut
      };
    case 'RESET_MANUAL_LOG_OUT':
      return {
        ...state,
        manualLogOut: false
      };
    default:
      return state;
  }
};

export default authReducer;

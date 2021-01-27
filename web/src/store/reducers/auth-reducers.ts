import { User } from '../../types/auth-types';
import { AuthActions } from '../types/auth-types';

export interface AuthState {
  user: User;
  isAuthenticated: boolean;
  accessToken: string | null;
}

const initialState: AuthState = {
  user: {} as User,
  isAuthenticated: !!localStorage.getItem('token'),
  accessToken: null
};

const authReducer = (state: AuthState = initialState, action: AuthActions) => {
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
    default:
      return state;
  }
};

export default authReducer;

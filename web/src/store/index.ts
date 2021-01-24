import ReduxThunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware, Action } from 'redux';
import authReducer from './reducers/auth-reducers';

const reducers = combineReducers({
  auth: authReducer
});

const LOG_OUT = 'LOG_OUT';
interface LogOutAction extends Action<typeof LOG_OUT> {}
type RootActions = LogOutAction;

export const logOut = (): RootActions => ({
  type: 'LOG_OUT'
});

export const rootReducer = (state: any, action: any) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }

  localStorage.removeItem('token');

  return reducers(state, action);
};

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export type RootState = ReturnType<typeof rootReducer>;
export default store;

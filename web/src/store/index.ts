import ReduxThunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import authReducer from './reducers/auth-reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  auth: authReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

export type RootState = ReturnType<typeof rootReducer>;
export default store;

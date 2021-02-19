import ReduxThunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/auth-reducers';
import cartReducer from './reducers/cart-reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

export type RootState = ReturnType<typeof rootReducer>;
export default store;

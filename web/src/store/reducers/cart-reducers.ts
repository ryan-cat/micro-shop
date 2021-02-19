import { CartActions } from '../types/cart-types';
import { CartItem } from './../../types/cart-types';

export interface CartState {
  items: CartItem[];
  count: number;
}

const initialState: CartState = {
  items: [],
  count: 0
};

const cartReducer = (state: CartState = initialState, action: CartActions): CartState => {
  switch (action.type) {
    case 'ADD_ITEM_TO_CART':
      return {
        ...state,
        items: [action.cartItem, ...state.items],
        count: state.count + 1
      };
    case 'SET_CART':
      return {
        ...state,
        items: action.cartItems,
        count: action.cartItems.length
      };
    default:
      return state;
  }
};

export default cartReducer;

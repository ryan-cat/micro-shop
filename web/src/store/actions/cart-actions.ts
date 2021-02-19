import { CartItem } from './../../types/cart-types';
import { Dispatch } from 'redux';
import { CartActions } from '../types/cart-types';

export const setCart = (cartItems: CartItem[]) => (dispatch: Dispatch<CartActions>) => {
  dispatch({
    type: 'SET_CART',
    cartItems
  });
};

export const addItemToCart = (cartItem: CartItem) => (dispatch: Dispatch<CartActions>) => {
  dispatch({
    type: 'ADD_ITEM_TO_CART',
    cartItem
  });
};

export const removeItemFromCart = (cartItem: CartItem) => (dispatch: Dispatch<CartActions>) => {
  dispatch({
    type: 'REMOVE_ITEM_FROM_CART',
    cartItem
  });
};

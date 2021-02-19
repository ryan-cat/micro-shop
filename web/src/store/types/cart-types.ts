import { CartItem } from './../../types/cart-types';
import { Action } from 'redux';

export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const SET_CART = 'SET_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
export interface AddItemToCart extends Action<typeof ADD_ITEM_TO_CART> {
  cartItem: CartItem;
}

export interface RemoveItemFromCart extends Action<typeof REMOVE_ITEM_FROM_CART> {
  cartItem: CartItem;
}

export interface SetCart extends Action<typeof SET_CART> {
  cartItems: CartItem[];
}

export type CartActions = AddItemToCart | RemoveItemFromCart | SetCart;

import { CartItem } from './../models/cart-models';
import { ListDto } from '@micro-shop/common';

export interface AddItemToCartDto {
  productId: string;
}

export type CartItemList = ListDto<CartItem>;

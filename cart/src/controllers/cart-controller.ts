import { CartItemDocument } from './../models/cart-models';
import { AuthenticatedUser, AuthUser } from '@micro-shop/common';
import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from '../services/cart-service';
import { AddItemToCartDto } from '../types/cart-types';

@Controller()
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  addItemToCart(@AuthUser() user: AuthenticatedUser, @Body() body: AddItemToCartDto): Promise<CartItemDocument> {
    return this.cartService.addItemToCart(user, body);
  }
}

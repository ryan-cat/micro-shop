import { CartItemDocument } from './../models/cart-models';
import { AuthenticatedUser, AuthUser } from '@micro-shop/common';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from '../services/cart-service';
import { AddItemToCartDto, CartItemList } from '../types/cart-types';

@Controller()
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@AuthUser() user: AuthenticatedUser): Promise<CartItemList> {
    return this.cartService.getCart(user);
  }

  @Post()
  addItemToCart(@AuthUser() user: AuthenticatedUser, @Body() body: AddItemToCartDto): Promise<CartItemDocument> {
    return this.cartService.addItemToCart(user, body);
  }

  @Delete(':id')
  deleteItemFromCart(@AuthUser() user: AuthenticatedUser, @Param('id') id: string): Promise<void> {
    return this.cartService.removeItemFromCart(user, id);
  }
}

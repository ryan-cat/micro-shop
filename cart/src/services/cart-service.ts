import { CartItem, CartItemDocument } from './../models/cart-models';
import { AuthenticatedUser, NotFoundError, validate, EventBus, EventBusTopics, CartItemAddedEvent } from '@micro-shop/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddItemToCartDto, CartItemList } from '../types/cart-types';
import { Product, ProductDocument } from '../models/product-models';
import { AddItemToCartDtoValidator } from '../validators/cart-validators';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(CartItem.name) private cartItemModel: Model<CartItemDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private eventBus: EventBus
  ) {}

  async getCart(user: AuthenticatedUser): Promise<CartItemList> {
    const query = this.cartItemModel.find({ userId: user.sub }).sort({ createdAt: 'desc' }).populate('product');
    const cartItems = await query.exec();
    const count = await query.countDocuments();

    return {
      items: cartItems,
      count
    };
  }

  async addItemToCart(user: AuthenticatedUser, dto: AddItemToCartDto): Promise<CartItemDocument> {
    validate(dto, AddItemToCartDtoValidator);

    const product = await this.productModel.findById(dto.productId);
    if (!product) {
      throw new NotFoundError('The specified product could not be found.');
    }

    let cartItem = await this.cartItemModel.create({
      product: dto.productId,
      userId: user.sub
    });

    cartItem = await cartItem.populate('product').execPopulate();

    const publishData: CartItemAddedEvent['data'] = {
      id: cartItem.id,
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        updatedAt: product.updatedAt
      },
      userId: cartItem.userId,
      createdAt: cartItem.id
    };

    await this.eventBus.publish({
      topic: EventBusTopics.CartItemAdded,
      data: publishData
    });

    return cartItem;
  }
}

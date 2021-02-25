import { CheckoutValidator } from './../validators/checkout-validators';
import { BadRequestError, validate } from '@micro-shop/common';
import { Cache } from 'cache-manager';
import { AuthenticatedUser } from '@micro-shop/common';
import { Inject, Injectable, CACHE_MANAGER } from '@nestjs/common';
import { CheckoutDto, CheckoutSession } from 'src/types/checkout-types';
import { v4 as uuid } from 'uuid';
import { Product, ProductDocument } from '../models/product-models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CheckoutService {
  private static readonly CHECKOUT_SESSION_TTL = 60 * 60; // 1 hour

  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>, @Inject(CACHE_MANAGER) private cache: Cache) {}

  async checkout(user: AuthenticatedUser, dto: CheckoutDto) {
    validate(dto, CheckoutValidator);

    const sessionId = uuid();
    const id = `${sessionId}_${user.sub}`;

    const products = await this.productModel.find({
      _id: {
        $in: dto.productIds
      }
    });

    if (products.length !== dto.productIds.length) {
      throw new BadRequestError('One or more of the items could not be found to be checked out.');
    }

    const subtotal = products.reduce((val, item) => val + item.price, 0);
    const estimatedTax = Math.ceil(subtotal * 0.07 * 100) / 100;
    const total = Math.ceil(subtotal + estimatedTax * 100) / 100;

    const value: CheckoutSession = {
      products: products.map((x) => ({ id: x.id, price: x.price })),
      subtotal,
      estimatedTax,
      total
    };

    await this.cache.set(id, value, { ttl: CheckoutService.CHECKOUT_SESSION_TTL });

    return {
      id: sessionId,
      products,
      subtotal,
      estimatedTax,
      total
    };
  }
}

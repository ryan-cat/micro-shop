import { CartItem, CartItemSchema } from './../models/cart-models';
import { CartService } from './../services/cart-service';
import { CartController } from '../controllers/cart-controller';
import { Module } from '@nestjs/common';
import { Product, ProductSchema } from '../models/product-models';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSubscriptions } from '../subscriptions/product-subscriptions';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: CartItem.name, schema: CartItemSchema }
    ])
  ],
  providers: [CartService, ProductSubscriptions],
  controllers: [CartController]
})
export class CartModule {}

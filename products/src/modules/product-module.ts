import { User, UserSchema } from './../models/user-models';
import { ProductSchema, Product } from '../models/product-models';
import { ProductController } from '../controllers/product-controller';
import { Module } from '@nestjs/common';
import { ProductService } from '../services/product-service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSubscriptions } from '../subscriptions/account-subscriptions';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema }
    ])
  ],
  providers: [ProductService, AccountSubscriptions],
  controllers: [ProductController]
})
export class ProductModule {}

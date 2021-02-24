import { ProductSubscriptions } from './../subscriptions/product-subscriptions';
import { Product, ProductSchema } from './../models/product-models';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckoutService } from '../services/checkout-service';
import { CheckoutController } from '../controllers/checkout-controller';
import { Module, CacheModule } from '@nestjs/common';
import cacheConfig from 'src/configs/cache-config';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: cacheConfig
    }),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
  ],
  providers: [CheckoutService, ProductSubscriptions],
  controllers: [CheckoutController]
})
export class CheckoutModule {}

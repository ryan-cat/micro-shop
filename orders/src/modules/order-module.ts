import { OrderService } from '../services/order-service';
import { OrderController } from '../controllers/order-controller';
import { Module, CacheModule } from '@nestjs/common';
import cacheConfig from 'src/configs/cache-config';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: cacheConfig
    })
  ],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}

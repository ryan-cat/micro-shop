import { OrderService } from '../services/order-service';
import { OrderController } from '../controllers/order-controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}

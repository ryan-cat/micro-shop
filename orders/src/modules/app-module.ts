import { EventBusModule } from '@micro-shop/common';
import databaseConfig from '../configs/database-config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './order-module';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckoutModule } from './checkout-module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig]
    }),
    MongooseModule.forRootAsync({
      useFactory: databaseConfig
    }),
    EventBusModule.register({
      url: process.env.EVENT_BUS_URL,
      transportOptions: {
        queueName: 'order-service'
      }
    }),
    OrderModule,
    CheckoutModule
  ]
})
export class AppModule {}

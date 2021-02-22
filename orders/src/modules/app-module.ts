import { EventBusModule } from '@micro-shop/common';
import databaseConfig from '../configs/database-config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './order-module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig]
    }),
    MongooseModule.forRootAsync({
      useFactory: databaseConfig
    }),
    OrderModule,
    EventBusModule.register({
      url: process.env.EVENT_BUS_URL,
      transportOptions: {
        queueName: 'order-service'
      }
    })
  ]
})
export class AppModule {}

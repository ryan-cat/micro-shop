import { EventBusModule } from '@micro-shop/common';
import databaseConfig from '../configs/database-config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './cart-module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig]
    }),
    MongooseModule.forRootAsync({
      useFactory: databaseConfig
    }),
    CartModule,
    EventBusModule.register({
      url: process.env.EVENT_BUS_URL,
      transportOptions: {
        queueName: 'cart-service'
      }
    })
  ]
})
export class AppModule {}

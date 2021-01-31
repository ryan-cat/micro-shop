import { EventBusModule } from '@micro-shop/common';
import databaseConfig from '../configs/database-config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product-module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig]
    }),
    MongooseModule.forRootAsync({
      useFactory: databaseConfig
    }),
    ProductModule,
    EventBusModule.register({
      url: process.env.EVENT_BUS_URL,
      transportOptions: {
        queueName: 'products-service'
      }
    })
  ]
})
export class AppModule {}

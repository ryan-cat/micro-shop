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
    ProductModule
  ]
})
export class AppModule {}

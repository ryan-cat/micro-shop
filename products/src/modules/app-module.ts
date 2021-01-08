import databaseConfig from '../configs/database-config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product-module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({ ...databaseConfig(), autoLoadEntities: true })
    }),
    ProductModule
  ]
})
export class AppModule {}

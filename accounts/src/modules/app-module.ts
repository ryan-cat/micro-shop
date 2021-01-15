import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './account-module';
import databaseConfig from '../configs/database-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      useFactory: databaseConfig
    }),
    AccountModule
  ]
})
export class AppModule {}

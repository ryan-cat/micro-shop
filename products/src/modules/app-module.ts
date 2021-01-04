import databaseConfig from '../configs/database-config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product-module';
import { GraphQLFederationModule } from '@nestjs/graphql';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({ ...databaseConfig(), autoLoadEntities: true })
    }),
    GraphQLFederationModule.forRoot({
      path: '/graphql',
      autoSchemaFile: true
    }),
    ProductModule
  ]
})
export class AppModule {}

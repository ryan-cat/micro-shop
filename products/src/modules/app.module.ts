import databaseConfig from '../configs/databaseConfig';
import migrationConfig from '../configs/migrationConfig';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products.module';
console.log(migrationConfig);
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({ ...databaseConfig(), autoLoadEntities: true })
    }),
    ProductsModule
  ]
})
export class AppModule {}

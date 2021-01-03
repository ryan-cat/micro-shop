import { Product } from './../models/products.models';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Product])]
})
export class ProductsModule {}

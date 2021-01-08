import { ProductController } from '../controllers/product-controller';
import { Product } from '../models/product-models';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductService } from '../services/product-service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}

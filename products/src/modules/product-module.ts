import { ProductSchema, Product } from '../models/product-models';
import { ProductController } from '../controllers/product-controller';
import { Module } from '@nestjs/common';
import { ProductService } from '../services/product-service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}

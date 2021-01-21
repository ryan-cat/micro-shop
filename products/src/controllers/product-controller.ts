import { Product } from './../models/product-models';
import { ProductService } from '../services/product-service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getList(): Promise<Product[]> {
    return this.productService.getProducts();
  }
}

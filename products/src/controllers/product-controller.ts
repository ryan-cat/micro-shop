import { ProductDto } from '../types/product-types';
import { ProductService } from '../services/product-service';
import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getList(): Promise<ProductDto[]> {
    const products = await this.productService.getProducts();
    return ProductDto.mapAll(products);
  }
}

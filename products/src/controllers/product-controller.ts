import { CreateProductDto, ProductDto } from '../types/product-types';
import { ProductService } from '../services/product-service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Product } from '../models/product-models';
import { AuthUser, AuthenticatedUser } from '@micro-shop/common';

@Controller()
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getList(): Promise<ProductDto[]> {
    const products = await this.productService.getProducts();
    return ProductDto.mapAll(products);
  }

  @Post()
  async createProduct(@Body() dto: CreateProductDto, @AuthUser() user: AuthenticatedUser): Promise<any> {
    console.log(user, user.isAuthenticated, user.sub, user.email);
    return Promise.resolve({});
    // return this.productService.createProduct(user, dto);
  }
}

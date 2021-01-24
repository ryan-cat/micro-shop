import { AuthUser, AuthenticatedUser } from '@micro-shop/common';
import { CreateProductDto } from '../types/product-types';
import { Product } from './../models/product-models';
import { ProductService } from '../services/product-service';
import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller()
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getList(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() dto: CreateProductDto, @AuthUser() user: AuthenticatedUser): Promise<any> {
    return this.productService.createProduct(user, dto);
  }
}

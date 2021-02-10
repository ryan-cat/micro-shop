import { AuthUser, AuthenticatedUser, ListOptions } from '@micro-shop/common';
import { CreateProductDto, ProductListDto, ProductSort } from '../types/product-types';
import { ProductService } from '../services/product-service';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';

@Controller()
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getList(@Query() query: ListOptions<ProductSort>): Promise<ProductListDto> {
    return this.productService.getProducts(query);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() dto: CreateProductDto, @AuthUser() user: AuthenticatedUser): Promise<any> {
    return this.productService.createProduct(user, dto);
  }
}

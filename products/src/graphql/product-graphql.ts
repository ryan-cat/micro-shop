import { ProductDto } from '../types/product-types';
import { ProductService } from '../services/product-service';
import { Product } from '../models/product-models';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [ProductDto])
  products(): Promise<ProductDto[]> {
    return this.productService.getProducts();
  }
}

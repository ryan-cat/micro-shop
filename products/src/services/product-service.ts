import { Product } from '../models/product-models';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from 'src/types/product-types';
import { AuthenticatedUser } from '@micro-shop/common';

@Injectable()
export class ProductService {
  public getProducts(): Promise<Product[]> {
    return Product.find();
  }

  public createProduct(user: AuthenticatedUser, dto: CreateProductDto): Promise<Product> {
    const product = new Product();
    product.name = dto.name;
    product.description = dto.description;
    product.imageUrl = dto.imageUrl;
    product.price = dto.price;
    product.sellerId = user.sub;

    return Product.save(product);
  }
}

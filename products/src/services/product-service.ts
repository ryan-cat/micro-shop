import { Product } from '../models/product-models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  public getProducts(): Promise<Product[]> {
    return Product.find();
  }
}

import { ProductDocument } from './../models/product-models';
import { Product } from '../models/product-models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  public getProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
}

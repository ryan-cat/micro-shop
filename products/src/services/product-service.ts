import { CreateProductDtoValidator } from './../validators/product-validators';
import { ProductDocument } from './../models/product-models';
import { Product } from '../models/product-models';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from 'src/types/product-types';
import { AuthenticatedUser, validate } from '@micro-shop/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  public getProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  public createProduct(user: AuthenticatedUser, dto: CreateProductDto): Promise<Product> {
    validate(dto, CreateProductDtoValidator);

    return this.productModel.create({
      ...dto,
      sellerId: user.sub
    });
  }
}

import { UserDocument, User } from '../models/user-models';
import { CreateProductDtoValidator } from './../validators/product-validators';
import { ProductDocument } from './../models/product-models';
import { Product } from '../models/product-models';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from 'src/types/product-types';
import { AuthenticatedUser, validate, InternalServerError } from '@micro-shop/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>, @InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public getProducts(): Promise<Product[]> {
    return this.productModel.find().populate('seller').exec();
  }

  public async createProduct(user: AuthenticatedUser, dto: CreateProductDto): Promise<Product> {
    validate(dto, CreateProductDtoValidator);

    const seller = await this.userModel.findById(user.sub);
    if (!seller) {
      throw new InternalServerError();
    }

    return this.productModel.create({
      ...dto,
      seller: user.sub
    });
  }
}

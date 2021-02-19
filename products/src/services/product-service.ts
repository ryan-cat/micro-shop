import { ProductCreatedEvent } from '@micro-shop/common';
import { EventBus, EventBusTopics } from '@micro-shop/common';
import { UserDocument, User } from '../models/user-models';
import { CreateProductDtoValidator } from './../validators/product-validators';
import { ProductDocument } from './../models/product-models';
import { Product } from '../models/product-models';
import { Injectable } from '@nestjs/common';
import { CreateProductDto, ProductListDto, ProductSort } from '../types/product-types';
import { AuthenticatedUser, validate, UnauthorizedError, getListQueryParams, ListOptions } from '@micro-shop/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private eventBus: EventBus
  ) {}

  public async getProducts(listOptions: ListOptions<ProductSort> = null): Promise<ProductListDto> {
    const queryParams = getListQueryParams(listOptions, 'price', 'desc');
    const products = await this.productModel
      .find()
      .limit(queryParams.limit)
      .skip(queryParams.skip)
      .sort({ [queryParams.sort]: queryParams.direction })
      .populate('seller')
      .exec();

    const count = await this.productModel.countDocuments();

    return {
      items: products,
      count
    };
  }

  public async createProduct(user: AuthenticatedUser, dto: CreateProductDto): Promise<Product> {
    validate(dto, CreateProductDtoValidator);

    const seller = await this.userModel.findById(user.sub);
    if (!seller) {
      throw new UnauthorizedError();
    }

    let product = await this.productModel.create({
      ...dto,
      seller: user.sub
    });

    product = await product.populate('seller').execPopulate();

    const publishData: ProductCreatedEvent['data'] = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      seller: {
        id: seller.id,
        name: seller.name,
        updatedAt: seller.updatedAt
      }
    };

    await this.eventBus.publish({
      topic: EventBusTopics.ProductCreated,
      data: publishData
    });

    return product;
  }
}

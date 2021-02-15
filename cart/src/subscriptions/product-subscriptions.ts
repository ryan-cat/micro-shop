import { Product, ProductDocument } from '../models/product-models';
import { EventBus, EventBusTopics, ProductCreatedEvent } from '@micro-shop/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductSubscriptions {
  constructor(private bus: EventBus, @InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  onApplicationBootstrap() {
    this.bus.subscribe(EventBusTopics.ProductCreated, this.handleProductCreated);
  }

  public handleProductCreated = async (data: ProductCreatedEvent['data'], message) => {
    await this.productModel.create({
      _id: data.id,
      name: data.name,
      imageUrl: data.imageUrl,
      price: data.price,
      updatedAt: data.updatedAt
    });
    message.ack();
  };
}

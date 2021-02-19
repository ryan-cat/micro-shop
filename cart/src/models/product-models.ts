import { standardMongoJSON } from '@micro-shop/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({
  toJSON: standardMongoJSON({
    transform: (_, ret) => {
      delete ret.updatedAt;
    }
  })
})
export class Product {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  imageUrl: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, type: Date })
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass<Product, ProductDocument>(Product);

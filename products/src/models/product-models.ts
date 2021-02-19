import { standardMongoJSON } from '@micro-shop/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user-models';

export type ProductDocument = Product & Document;
@Schema({
  toJSON: standardMongoJSON(),
  timestamps: true
})
export class Product {
  @Prop({ required: true, type: String, maxlength: 70 })
  name: string;

  @Prop({ required: true, type: String, maxlength: 500 })
  description: string;

  @Prop({ required: true, type: String })
  imageUrl: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  seller: string;

  createdAt: Date;
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass<Product, ProductDocument>(Product);

import { standardMongoJSON } from '@micro-shop/common';
import { Product } from './product-models';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartItemDocument = CartItem & Document;

@Schema({
  toJSON: standardMongoJSON(),
  timestamps: {
    createdAt: true,
    updatedAt: false
  }
})
export class CartItem {
  @Prop({ required: true, type: Types.ObjectId, ref: Product.name })
  product: string;

  @Prop({ required: true, type: Types.ObjectId })
  userId: string;

  createdAt: Date;
}

export const CartItemSchema = SchemaFactory.createForClass<CartItem, CartItemDocument>(CartItem);

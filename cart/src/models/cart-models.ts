import { Product } from './product-models';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartItemDocument = CartItem & Document;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
    }
  }
})
export class CartItem {
  @Prop({ required: true, type: Types.ObjectId, ref: Product.name })
  product: string;

  @Prop({ required: true, type: Types.ObjectId })
  userId: string;

  @Prop()
  createdAt: Date;
}

export const CartItemSchema = SchemaFactory.createForClass<CartItem, CartItemDocument>(CartItem);

CartItemSchema.pre('save', function () {
  this.set('createdAt', this.get('createdAt') || new Date());
});

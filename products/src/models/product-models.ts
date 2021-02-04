import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user-models';

export type ProductDocument = Product & Document;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
    }
  }
})
export class Product {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: String })
  imageUrl: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  seller: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass<Product, ProductDocument>(Product);

ProductSchema.pre('save', function () {
  this.set('createdAt', this.get('createdAt') || new Date());
  this.set('updatedAt', new Date());
});

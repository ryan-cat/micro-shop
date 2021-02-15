import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  imageUrl: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop()
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass<Product, ProductDocument>(Product);

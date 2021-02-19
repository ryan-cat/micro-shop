import { standardMongoJSON } from '@micro-shop/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, model, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  toJSON: standardMongoJSON({
    transform: (_, ret) => {
      delete ret.updatedAt;
    }
  })
})
export class User {
  @Prop({ type: Types.ObjectId })
  _id: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ unique: true, required: true, type: String })
  email: string;

  @Prop({ required: true, type: Date })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass<User, UserDocument>(User);
export const UserModel = model('User', UserSchema);

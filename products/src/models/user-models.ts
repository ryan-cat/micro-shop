import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, model, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
    }
  }
})
export class User {
  @Prop({ type: Types.ObjectId })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass<User, UserDocument>(User);
export const UserModel = model('User', UserSchema);

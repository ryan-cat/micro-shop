import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    }
  }
})
export class User {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ unique: true, required: true, type: String, lowercase: true })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass<User, UserDocument>(User);

UserSchema.pre('save', async function (done) {
  const hashedPassword = await bcrypt.hash(this.get('password'), 10);
  this.set('password', hashedPassword);

  this.set('createdAt', this.get('createdAt') || new Date());
  this.set('updatedAt', new Date());

  done();
});

import { standardMongoJSON } from '@micro-shop/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = User & Document;

@Schema({
  toJSON: standardMongoJSON({
    transform: (_, ret) => {
      delete ret.password;
    }
  }),
  timestamps: true
})
export class User {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ unique: true, required: true, type: String, lowercase: true })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass<User, UserDocument>(User);

UserSchema.pre('validate', async function (done) {
  const hashedPassword = await bcrypt.hash(this.get('password'), 10);
  this.set('password', hashedPassword);
  done();
});

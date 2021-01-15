import { isMongoUniqueError, ValidationError } from './../errors/index';
import { validate } from './../errors';
import { SignUpDtoValidator } from './../validators/account-validators';
import { User, UserDocument } from './../models/account-models';
import { SignUpDto } from './../types/account-types';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AccountService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signUp(dto: SignUpDto): Promise<UserDocument> {
    validate(dto, SignUpDtoValidator);

    try {
      return await this.userModel.create({
        email: dto.email,
        name: dto.name,
        password: dto.password
      });
    } catch (err) {
      if (isMongoUniqueError(err, 'email')) {
        throw new ValidationError([{ path: ['email'], message: 'An account with this email already exists.' }]);
      }
    }
  }
}

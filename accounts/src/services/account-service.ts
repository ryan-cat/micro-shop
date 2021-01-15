import { isMongoUniqueError, NotFoundError, ValidationError, UnauthorizedError } from './../errors';
import { validate } from './../errors';
import { AuthenticateDtoValidator, SignUpDtoValidator } from './../validators/account-validators';
import { User, UserDocument } from './../models/account-models';
import { AuthenticateDto, SignUpDto, AuthenticationResultDto } from './../types/account-types';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccountService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private configService: ConfigService) {}

  async authenticate(dto: AuthenticateDto): Promise<AuthenticationResultDto> {
    validate(dto, AuthenticateDtoValidator);

    const user = await this.userModel.findOne({ email: dto.email });

    if (!user) {
      throw new NotFoundError('An account could not be found for this email.');
    }

    const passwordCheck = await bcrypt.compare(dto.password, user.password);

    if (!passwordCheck) {
      throw new UnauthorizedError('Incorrect password provided for this account.');
    }

    const accessToken = await this.getAccessToken(user.id, user.name, user.email);
    const refreshToken = await this.getRefreshToken(user.id);

    return {
      accessToken,
      refreshToken,
      user
    };
  }

  async signUp(dto: SignUpDto): Promise<User> {
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

  private getAccessToken(subject: string, name: string, email: string): Promise<string> {
    return new Promise((res, rej) => {
      jwt.sign(
        {
          name,
          email
        },
        this.configService.get<string>('JWT_ACCESS_KEY'),
        {
          expiresIn: '1h',
          subject
        },
        (err, result) => {
          if (err) {
            rej(err);
          }

          res(result);
        }
      );
    });
  }

  private getRefreshToken(subject: string): Promise<string> {
    return new Promise((res, rej) => {
      jwt.sign(
        {},
        this.configService.get<string>('JWT_REFRESH_KEY'),
        {
          expiresIn: '30d',
          subject
        },
        (err, result) => {
          if (err) {
            rej(err);
          }

          res(result);
        }
      );
    });
  }
}

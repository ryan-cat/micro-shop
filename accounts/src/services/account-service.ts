import { isMongoUniqueError, NotFoundError, ValidationError, validate, BadRequestError, EventBus } from '@micro-shop/common';
import { SignUpDtoValidator } from './../validators/account-validators';
import { User, UserDocument } from './../models/account-models';
import { SignUpDto, AuthenticationResultDto, TokenRefreshDto, TokenRefreshResultDto } from './../types/account-types';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { UserCreatedEvent, EventBusTopics } from '@micro-shop/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AccountService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private bus: EventBus,
    private configService: ConfigService,
    private jwtService: JwtService
  ) {}

  async validateUserCredentials(email: string, password: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundError('An account could not be found for this email.');
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return null;
    }

    return user;
  }

  async login(user: UserDocument): Promise<AuthenticationResultDto> {
    return {
      user,
      accessToken: await this.getAccessToken(user.id, user.name, user.email),
      refreshToken: await this.getRefreshToken(user.id)
    };
  }

  async signUp(dto: SignUpDto): Promise<AuthenticationResultDto> {
    validate(dto, SignUpDtoValidator);

    try {
      const user = await this.userModel.create({
        email: dto.email,
        name: dto.name,
        password: dto.password
      });

      const accessToken = await this.getAccessToken(user.id, user.name, user.email);
      const refreshToken = await this.getRefreshToken(user.id);

      this.bus.publish<UserCreatedEvent>({
        topic: EventBusTopics.UserCreated,
        data: user as UserCreatedEvent['data']
      });

      return {
        user,
        accessToken,
        refreshToken
      };
    } catch (err) {
      if (isMongoUniqueError(err, 'email')) {
        throw new ValidationError([{ path: ['email'], message: 'An account with this email already exists.' }]);
      }
    }
  }

  async tokenRefresh(dto: TokenRefreshDto): Promise<TokenRefreshResultDto> {
    let decodedToken: { id: string } = null;

    try {
      decodedToken = await this.verifyRefreshToken(dto.refreshToken);
    } catch (err) {
      throw new BadRequestError('The refresh token is either invalid or expired.');
    }

    const user = await this.userModel.findOne({ id: decodedToken.id });

    if (!user) {
      throw new NotFoundError('The user associated with this refresh token could not be found.');
    }

    const accessToken = await this.getAccessToken(user.id, user.name, user.email);
    const refreshToken = await this.getRefreshToken(user.id);

    return {
      accessToken,
      refreshToken
    };
  }

  private getAccessToken(subject: string, name: string, email: string): Promise<string> {
    return this.jwtService.signAsync(
      { name, email },
      {
        secret: this.configService.get<string>('JWT_ACCESS_KEY'),
        expiresIn: '30m',
        subject
      }
    );
  }

  private getRefreshToken(subject: string): Promise<string> {
    return this.jwtService.signAsync(
      {},
      {
        secret: this.configService.get<string>('JWT_REFRESH_KEY'),
        subject,
        expiresIn: '30d'
      }
    );
  }

  private verifyRefreshToken(token: string): Promise<{ id: string }> {
    return this.jwtService.verifyAsync(token, { secret: this.configService.get<string>('JWT_REFRESH_KEY') });
  }
}

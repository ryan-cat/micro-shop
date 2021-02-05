import { User, UserSchema } from './../models/account-models';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AccountController } from '../controllers/account-controller';
import { AccountService } from '../services/account-service';
import { LocalStrategy } from '../utils/local-strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_KEY')
      }),
      inject: [ConfigService]
    })
  ],
  providers: [AccountService, LocalStrategy],
  controllers: [AccountController]
})
export class AccountModule {}

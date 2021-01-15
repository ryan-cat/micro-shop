import { User, UserSchema } from './../models/account-models';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AccountController } from 'src/controllers/account-controller';
import { AccountService } from 'src/services/account-service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [AccountService],
  controllers: [AccountController]
})
export class AccountModule {}

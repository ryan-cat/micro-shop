import { UserDocument } from '../models/account-models';
import { Strategy } from 'passport-local';
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AccountService } from '../services/account-service';
import { BadRequestError, InternalServerError, validate } from '@micro-shop/common';
import { AuthenticateDtoValidator } from '../validators/account-validators';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user, _, context: ExecutionContext) {
    const body = context.switchToHttp().getRequest().body;

    if (err || !user) {
      validate(body, AuthenticateDtoValidator);
      throw err || new InternalServerError();
    }

    return user;
  }
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private accountService: AccountService) {
    super({
      usernameField: 'email'
    });
  }

  async validate(email: string, password: string): Promise<UserDocument> {
    const user = await this.accountService.validateUserCredentials(email, password);

    if (!user) {
      throw new BadRequestError('Incorrect password provided for this account.');
    }

    return user;
  }
}

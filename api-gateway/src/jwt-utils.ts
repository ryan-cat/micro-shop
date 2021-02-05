import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { UnauthorizedError } from '@micro-shop/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, _, context: ExecutionContext) {
    const headers = context.switchToHttp().getRequest().headers;

    if (headers.authorization && (!user || err)) {
      throw new UnauthorizedError('The provided token is either invalid or expired.');
    }

    return user;
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_KEY
    });
  }

  async validate(payload: any) {
    return payload;
  }
}

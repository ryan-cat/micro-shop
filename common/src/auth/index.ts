import { UnauthorizedError } from '../errors';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export interface AuthTokenPayload {
  sub: string;
  name: string;
  email: string;
  expiresAt: Date;
}

const unauthorizedError = new UnauthorizedError('You must be authenticated to perform this operation.');

export class AuthenticatedUser {
  protected _sub: string;
  protected _name: string;
  protected _email: string;
  protected _payload: AuthTokenPayload;
  public isAuthenticated: boolean;

  constructor(payload: AuthTokenPayload = null) {
    this.isAuthenticated = !!payload;
    this._payload = payload;

    if (payload) {
      this._sub = payload.sub;
      this._name = payload.name;
      this._email = payload.email;
    }
  }

  get sub(): string {
    return this.safeGet(this._sub);
  }

  get name(): string {
    return this.safeGet(this._name);
  }

  get email(): string {
    return this.safeGet(this._email);
  }

  get payload(): string {
    return this.safeGet(this._payload);
  }

  protected safeGet(val: any): any {
    if (!this.isAuthenticated) {
      throw unauthorizedError;
    }

    return val;
  }
}

export const decodeAuthToken = (token: string): AuthTokenPayload | null => {
  if (!token || !token.startsWith('Bearer ')) {
    return null;
  }

  return jwt.decode(token.replace('Bearer ', '')) as AuthTokenPayload;
};

export const AuthUser = createParamDecorator(
  (data: { required: boolean }, ctx: ExecutionContext): AuthenticatedUser => {
    const req = ctx.switchToHttp().getRequest();
    const payload = decodeAuthToken(req.headers.authorization);

    if (!payload) {
      if (!data || !data.required) {
        throw unauthorizedError;
      } else {
        return new AuthenticatedUser();
      }
    }

    return new AuthenticatedUser(payload);
  }
);

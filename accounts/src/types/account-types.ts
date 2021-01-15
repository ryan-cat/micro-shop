import { User } from './../models/account-models';
export class SignUpDto {
  email: string;
  name: string;
  password: string;
}

export class AuthenticateDto {
  email: string;
  password: string;
}

export class AuthenticationResultDto {
  accessToken: string;
  refreshToken: string;
  user: User;
}

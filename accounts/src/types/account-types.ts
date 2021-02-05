import { User } from './../models/account-models';
export interface SignUpDto {
  email: string;
  name: string;
  password: string;
}

export interface ValidateUserCredentialsDto {
  email: string;
  password: string;
}

export interface AuthenticationResultDto {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface TokenRefreshDto {
  refreshToken: string;
}

export interface TokenRefreshResultDto {
  accessToken: string;
  refreshToken: string;
}

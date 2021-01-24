export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthenticationResult {
  accessToken: string;
  refreshToken: string;
  user: User;
}

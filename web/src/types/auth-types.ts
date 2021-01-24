export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAccountResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

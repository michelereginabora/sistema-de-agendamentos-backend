export interface LoginResult {
  access_token: string;
}

export interface JwtPayload {
  email: string;
  sub: number;
  isAdmin: boolean;
}

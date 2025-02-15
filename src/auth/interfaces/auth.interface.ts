export interface LoginResult {
  access_token: string;
}

export interface JwtPayload {
  email: string;
  sub: string;
  isAdmin: boolean;
}

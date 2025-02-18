export interface IUserResponse {
  user: {
    name: string
    email: string
    isAdmin: boolean
    isActive: boolean
  }
  token?: string
}

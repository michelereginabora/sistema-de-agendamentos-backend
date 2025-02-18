import { User } from '../entities/user.entity'

export interface IUserRepository {
  create(userData: Partial<User>): Promise<User>
  save(user: User): Promise<User>
  find(): Promise<User[]>
  findOneBy(criteria: { id?: string; email?: string }): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  update(id: string, data: Partial<User>): Promise<void>
  delete(id: string): Promise<void>
}

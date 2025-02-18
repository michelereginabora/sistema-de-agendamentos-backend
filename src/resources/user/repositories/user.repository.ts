import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Not, Repository } from 'typeorm'
import { IUser } from '../interfaces/user.interface'
import { IUserRepository } from '../interfaces/user-repository.interface'
import { User } from '../entities/user.entity'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>
  ) {}

  async create(userData: IUser): Promise<IUser> {
    const existingUser = await this.findByEmail(userData.email)

    if (existingUser) {
      throw new ConflictException('Já existe um usuário com esse email')
    }

    const user = this.repository.create(userData)
    return this.repository.save(user)
  }

  async save(user: IUser): Promise<IUser> {
    return this.repository.save(user)
  }

  async find(): Promise<IUser[]> {
    return this.repository.find()
  }

  async findOne(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email })
  }

  async findOneBy(criteria: {
    id?: string
    email?: string
  }): Promise<User | null> {
    return this.repository.findOneBy(criteria)
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email })
  }
  async update(id: string, data: Partial<IUser>): Promise<void> {
    if (data.email) {
      const existingUser = await this.repository.findOne({
        where: {
          email: data.email,
          id: Not(id),
        },
      })

      if (existingUser) {
        throw new ConflictException('Já existe um usuário com esse email')
      }
    }

    await this.repository.update(id, data)
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}

import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { User } from '../entities/user.entity'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { IPasswordHasher } from '../interfaces/password-hasher.interface'
import { IUserRepository } from '../interfaces/user-repository.interface'
import { IUserResponse } from '../interfaces/user-response.interface'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordHasher')
    private readonly passwordHasher: IPasswordHasher,
    private readonly jwtService: JwtService
  ) {}
  async create(createUserDto: CreateUserDto): Promise<IUserResponse> {
    const hashedPassword = await this.passwordHasher.hash(
      createUserDto.password
    )

    const hashedUser = {
      ...createUserDto,
      password: hashedPassword,
    }

    const user = await this.userRepository.create(hashedUser)
    const savedUser = await this.userRepository.save(user)

    const { password, id, ...userData } = savedUser

    const token = this.jwtService.sign({
      sub: savedUser.id,
      email: savedUser.email,
    })

    return {
      user: userData,
      token,
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id })
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<IUserResponse> {
    await this.userRepository.update(id, updateUserDto)
    const user = await this.userRepository.findOneBy({ id })

    if (!user) {
      throw new NotFoundException(`User not found with id ${id}`)
    }

    const { password, ...userWithoutPassword } = user

    return {
      user: userWithoutPassword,
    }
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email)
  }
  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}

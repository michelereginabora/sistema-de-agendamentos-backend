import { Injectable } from '@nestjs/common'
import { hashPassword } from 'src/utils/hash'
import { IPasswordHasher } from '../interfaces/password-hasher.interface'

@Injectable()
export class PasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    return hashPassword(password)
  }
}

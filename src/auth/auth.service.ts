import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/resources/user/services/user.service';
import { User } from 'src/resources/user/entities/user.entity';
import { LoginResult, JwtPayload } from './interfaces/auth.interface';
import * as bcrypt from 'bcrypt';

type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserWithoutPassword | null> {
    const user = await this.userService.findByEmail(email.toLowerCase().trim());

    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Email ou senha inválidos');
      }

      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }
  }

  login(user: UserWithoutPassword): LoginResult {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      isAdmin: user.isAdmin,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
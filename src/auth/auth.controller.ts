import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginResult } from './interfaces/auth.interface'
import { LoginDto } from './dto/auth-dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<LoginResult> {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password
    )

    if (user) {
      return this.authService.login(user)
    } else {
      throw new UnauthorizedException('Invalid credentials')
    }
  }
}

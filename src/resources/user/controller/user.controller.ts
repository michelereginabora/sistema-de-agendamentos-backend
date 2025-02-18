import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard'
import { AdminGuard } from 'src/auth/guard/admin.guard'
import { UserService } from '../services/user.service'
import { User } from '../entities/user.entity'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { IUserResponse } from '../interfaces/user-response.interface'
import { RequestWithUser } from 'src/utils/requestWithUser'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<IUserResponse> {
    return this.userService.create(createUserDto)
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(id)
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(
    @Request() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<IUserResponse> {
    return this.userService.update(req.user.userId, updateUserDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id)
  }
}

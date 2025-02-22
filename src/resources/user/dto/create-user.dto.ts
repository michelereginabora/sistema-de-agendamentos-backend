import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Nome do usuário',
  })
  @IsString()
  name: string

  @ApiProperty({
    example: 'john@email.com',
    description: 'Email do usuário',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'O email é obrigatório' })
  email: string

  @ApiProperty({
    example: '123456',
    description: 'Senha do usuário',
  })
  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  password: string

  @ApiProperty({
    example: false,
    description: 'Define se o usuário é administrador',
  })
  @IsBoolean()
  isAdmin: boolean

  @ApiProperty({
    example: true,
    description: 'Define se o usuário está ativo',
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive: boolean
}

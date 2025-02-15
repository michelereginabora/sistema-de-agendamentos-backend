import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Nome do usuário',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({
    example: 'john@email.com',
    description: 'Email do usuário',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string

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
  isActive?: boolean
}

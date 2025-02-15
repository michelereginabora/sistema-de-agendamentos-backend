import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  isAdmin: boolean;
  
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}

import { IsNotEmpty, IsNumber, IsString, Min, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateServiceDto {
  @ApiProperty({
    example: 'Corte de Cabelo',
    description: 'Nome do serviço',
    maxLength: 100 
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string

  @ApiProperty({
    example: 30,
    description: 'Duração do serviço em minutos',
    minimum: 1
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  duration: number

  @ApiProperty({
    example: 50.00,
    description: 'Preço do serviço',
    minimum: 0
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number
}
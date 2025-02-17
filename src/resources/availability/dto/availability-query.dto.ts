import { IsDateString, IsOptional, IsString } from 'class-validator'

export class AvailabilityQueryDto {
  @IsDateString()
  @IsOptional()
  date?: string

  @IsString()
  @IsOptional()
  serviceId?: string
}

import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer';
import { IsUUID, IsDate, IsNotEmpty } from 'class-validator'

export class CreateAppointmentDto {
  @ApiProperty({
    example: '2d4f47fe-d7cc-4f04-9f58-0347e2eddcf7',
    description: 'ID do serviço',
  })
  @IsUUID()
  @IsNotEmpty()
  serviceId: string

  @ApiProperty({
    example: '2024-02-16T14:30:00.000Z',
    description: 'Data e horário do agendamento',
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  appointmentDate: Date;
}

import { Module } from '@nestjs/common'
import { AvailabilityService } from './availability.service'
import { AvailabilityController } from './availability.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Service } from '../services/service.entity'
import { Appointment } from '../appointments/appointments.entity'
import { User } from '../user/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Service, Appointment, User])],
  providers: [AvailabilityService],
  controllers: [AvailabilityController],
})
export class AvailabilityModule {}

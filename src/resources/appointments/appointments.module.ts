import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Appointment } from './appointments.entity'
import { AppointmentController } from './appointments.controller'
import { AppointmentService } from './appointments.service'
import { Service } from 'src/resources/services/entities/service.entity'
import { User } from '../user/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Service, User])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports: [AppointmentService],
})
export class AppointmentsModule {}

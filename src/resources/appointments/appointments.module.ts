import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Service } from '../services/entities/service.entity'
import { ServiceRepository } from '../services/repositories/service.repository'
import { User } from '../user/entities/user.entity'
import { AppointmentController } from './controller/appointments.controller'
import { Appointment } from './entities/appointments.entity'
import { AppointmentRepository } from './repositories/appointment.repository'
import { AppointmentService } from './services/appointments.service'


@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Service, User])],
  controllers: [AppointmentController],
  providers: [
    AppointmentService,
    { provide: 'IAppointmentRepository', useClass: AppointmentRepository },
    {
      provide: 'IServiceRepository',
      useClass: ServiceRepository,
    },
  ],
  exports: [AppointmentService],
})
export class AppointmentsModule {}

import { Module } from '@nestjs/common'
import { AvailabilityController } from './controller/availability.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Service } from '../services/entities/service.entity'
import { User } from '../user/entities/user.entity'
import { AvailabilityService } from './services/availability.service'
import { Appointment } from '../appointments/entities/appointments.entity'
import { ServiceRepository } from '../services/repositories/service.repository'
import { AvailabilityRepository } from './repositories/availability.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Service, Appointment, User])],
  providers: [
    AvailabilityService,
    { provide: 'IAvailabilityRepository', useClass: AvailabilityRepository },
    {
      provide: 'IServiceRepository',
      useClass: ServiceRepository,
    },
  ],
  controllers: [AvailabilityController],
})
export class AvailabilityModule {}

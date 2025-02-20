import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Appointment } from 'src/resources/appointments/entities/appointments.entity'
import { IAvailabilityRepository } from '../interfaces/availability.repository.interface'

@Injectable()
export class AvailabilityRepository implements IAvailabilityRepository {
  constructor(
    @InjectRepository(Appointment)
    private readonly repository: Repository<Appointment>
  ) {}

  async getServiceAppointments(
    serviceId: string,
    date: Date
  ): Promise<Appointment[]> {
    const requestedDate = date.toISOString().split('T')[0]

    return await this.repository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.service', 'service')
      .where('appointment.serviceId = :serviceId', { serviceId })
      .andWhere('DATE(appointment.appointmentDate) = :requestedDate', {
        requestedDate,
      })
      .orderBy('appointment.appointmentDate', 'ASC')
      .getMany()
  }
}

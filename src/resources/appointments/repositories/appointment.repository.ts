import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IAppointmentRepository } from '../interfaces/appointment-repository.interface'
import { Appointment } from '../entities/appointments.entity'
import { IAppointment } from '../interfaces/appointment.interface'

@Injectable()
export class AppointmentRepository implements IAppointmentRepository {
  constructor(
    @InjectRepository(Appointment)
    private readonly repository: Repository<Appointment>
  ) {}

  async save(appointment: Partial<IAppointment>): Promise<IAppointment> {
    return this.repository.save(appointment);
  }  

  async findByUserId(userId: string): Promise<IAppointment[]> {
    return this.repository.find({
      where: { userId },
    })
  }

  async findByUserIdWithService(userId: string): Promise<IAppointment[]> {
    return this.repository.find({
      where: { userId },
      relations: ['service'],
      order: { appointmentDate: 'ASC' },
    })
  }

  async findByServiceId(serviceId: string): Promise<IAppointment[]> {
    return this.repository.find({
      where: { serviceId },
    })
  }

  async findByServiceIdWithService(serviceId: string): Promise<IAppointment[]> {
    return this.repository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.service', 'service')
      .where('appointment.serviceId = :serviceId', { serviceId })
      .getMany()
  }
}

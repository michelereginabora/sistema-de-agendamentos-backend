import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateAppointmentDto } from './dto/create-appointments.dto'
import { Appointment } from './appointments.entity'
import { Service } from 'src/resources/services/entities/service.entity'

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>
  ) {}

  async createAppointment(
    userId: string,
    serviceId: string,
    appointmentData: CreateAppointmentDto
  ) {
    await this.validateUser(userId)

    await this.validateService(appointmentData.serviceId)

    const appointmentDate = new Date(appointmentData.appointmentDate)
    this.validateAppointmentDate(appointmentDate)

    await this.validateExistingUserAppointment(
      userId,
      serviceId,
      appointmentDate
    )

    await this.validateExistingServiceAppointment(
      appointmentData.serviceId,
      appointmentDate
    )

    return this.appointmentRepository.save({
      userId,
      serviceId,
      appointmentDate,
    })
  }

  private async validateUser(userId: string) {
    const user = await this.appointmentRepository.findOne({
      where: { userId },
    })
    return user
  }

  private async validateService(serviceId: string): Promise<Service> {
    const service = await this.servicesRepository.findOne({
      where: { id: serviceId },
    })

    if (!service) {
      throw new NotFoundException('Serviço inexistente')
    }
    return service
  }

  private validateAppointmentDate(appointmentDate: Date): void {
    const currentDate = new Date()

    if (appointmentDate < currentDate) {
      throw new BadRequestException(
        'Não é possível agendar para uma data passada'
      )
    }
  }

  private calculateAppointmentEndTime(appointment: Appointment): Date {
    const appointmentEndTime = new Date(appointment.appointmentDate)
    appointmentEndTime.setMinutes(
      appointmentEndTime.getMinutes() + appointment.service.duration
    )
    return appointmentEndTime
  }

  private async validateExistingUserAppointment(
    userId: string,
    serviceId: string,
    appointmentDate: Date
  ): Promise<void> {
    await this.validateService(serviceId)

    const existingAppointments = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.service', 'service')
      .where('appointment.userId = :userId', { userId })
      .getMany()

    for (const existingAppointment of existingAppointments) {
      const existingAppointmentEndTime =
        this.calculateAppointmentEndTime(existingAppointment)

      if (
        appointmentDate >= existingAppointment.appointmentDate &&
        appointmentDate < existingAppointmentEndTime
      ) {
        throw new BadRequestException(
          `Usuário já possui o agendamento ${existingAppointment.service?.name} para esse horário`
        )
      }
    }
  }

  private async validateExistingServiceAppointment(
    serviceId: string,
    appointmentDate: Date
  ): Promise<void> {
    await this.validateService(serviceId)

    const existingAppointments = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.service', 'service')
      .where('appointment.serviceId = :serviceId', { serviceId })
      .getMany()

    for (const existingAppointment of existingAppointments) {
      const existingAppointmentEndTime =
        this.calculateAppointmentEndTime(existingAppointment)

      if (
        appointmentDate >= existingAppointment.appointmentDate &&
        appointmentDate < existingAppointmentEndTime
      ) {
        throw new BadRequestException(
          'Serviço não está disponível para esse horário'
        )
      }
    }
  }
  async findUserAppointments(userId: string) {
    return this.appointmentRepository.find({
      where: { userId },
      relations: ['service'],
      order: { appointmentDate: 'ASC' },
    })
  }
}

import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
} from '@nestjs/common'
import { CreateAppointmentDto } from '../dto/create-appointments.dto'
import { Service } from 'src/resources/services/entities/service.entity'
import { IAppointmentRepository } from '../interfaces/appointment-repository.interface'
import { IAppointment } from '../interfaces/appointment.interface'
import { IServiceRepository } from 'src/resources/services/interfaces/service-repository.interface'

@Injectable()
export class AppointmentService {
  constructor(
    @Inject('IAppointmentRepository')
    private readonly appointmentRepository: IAppointmentRepository,
    @Inject('IServiceRepository')
    private readonly servicesRepository: IServiceRepository
  ) {}

  async createAppointment(
    userId: string,
    serviceId: string,
    appointmentData: CreateAppointmentDto
  ): Promise<IAppointment> {
    await this.validateUser(userId)
    await this.validateService(serviceId)

    const appointmentDate = new Date(appointmentData.appointmentDate)
    this.validateAppointmentDate(appointmentDate)

    await this.validateExistingUserAppointment(
      userId,
      serviceId,
      appointmentDate
    )
    await this.validateExistingServiceAppointment(serviceId, appointmentDate)

    const appointmentToSave: Partial<IAppointment> = {
      ...appointmentData,
      userId,
      serviceId,
      appointmentDate,
    }

    return this.appointmentRepository.save(appointmentToSave as IAppointment)
  }

  private async validateUser(userId: string): Promise<void> {
    const userAppointments =
      await this.appointmentRepository.findByUserId(userId)
    if (!userAppointments) {
      throw new NotFoundException('Usuário não encontrado')
    }
  }

  private async validateService(serviceId: string): Promise<Service> {
    const service = await this.servicesRepository.findOne(serviceId)

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

  private calculateAppointmentEndTime(appointment: IAppointment): Date {
    const appointmentEndTime = new Date(appointment.appointmentDate)
    if (!appointment.service) {
      throw new BadRequestException('Serviço não encontrado no agendamento')
    }
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

    const existingAppointments =
      await this.appointmentRepository.findByUserIdWithService(userId)

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

    const existingAppointments =
      await this.appointmentRepository.findByServiceIdWithService(serviceId)

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

  async findUserAppointments(userId: string): Promise<IAppointment[]> {
    return this.appointmentRepository.findByUserIdWithService(userId)
  }
}

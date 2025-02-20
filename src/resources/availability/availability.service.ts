import { Injectable, NotFoundException } from '@nestjs/common'
import { Appointment } from '../appointments/appointments.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Service } from '../services/entities/service.entity'
import { AvailabilityResponse } from './interfaces/availability-response.interface'
import { TimeSlot } from './interfaces/time-slot.interface'
import { BusinessHoursConfig } from './interfaces/business-hours.interface'

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>
  ) {}

  async findAvailableSlots(
    serviceId: string,
    date: Date
  ): Promise<AvailabilityResponse> {
    const service = await this.validateService(serviceId)
    const appointments = await this.getServiceAppointments(serviceId, date)

    // Configuração dos horários de funcionamento considerando o horário comercial
    const businessHours = {
      start: 9, // 9:00
      end: 18, // 18:00
      slotDuration: 30, // duração do slot em minutos
    }

    const availableSlots = this.calculateAvailableSlots(
      service,
      appointments,
      businessHours
    )

    return {
      serviceName: service.name,
      appointmentDate: date.toISOString(),
      availableSlots,
    }
  }

  private async validateService(serviceId: string): Promise<Service> {
    const service = await this.servicesRepository.findOne({
      where: { id: serviceId },
    })

    if (!service) {
      throw new NotFoundException('Serviço não encontrado')
    }

    return service
  }

  private async getServiceAppointments(
    serviceId: string,
    date: Date
  ): Promise<Appointment[]> {
    const requestedDate = date.toISOString().split('T')[0]

    const appointments = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.service', 'service')
      .where('appointment.serviceId = :serviceId', { serviceId })
      .andWhere('DATE(appointment."appointmentDate") = :requestedDate', {
        requestedDate,
      })
      .orderBy('appointment."appointmentDate"', 'ASC')
      .getMany()

    return appointments
  }

  private normalizeBookedSlots(
    appointments: Appointment[],
    serviceDuration: number
  ): { start: number; end: number }[] {
    return appointments.map((appointment) => {
      const startTime = new Date(appointment.appointmentDate)
      const endTime = new Date(startTime.getTime() + serviceDuration * 60000)

      return {
        start: startTime.getHours() * 60 + startTime.getMinutes(),
        end: endTime.getHours() * 60 + endTime.getMinutes(),
      }
    })
  }

  private calculateAvailableSlots(
    service: Service,
    appointments: Appointment[],
    businessHours: BusinessHoursConfig
  ): TimeSlot[] {
    const availableSlots: TimeSlot[] = []
    const { start, end } = businessHours
    const bookedSlots = this.normalizeBookedSlots(
      appointments,
      service.duration
    )

    for (let hour = start; hour < end; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const slotStartMinutes = hour * 60 + minute
        const slotEndMinutes = slotStartMinutes + service.duration

        if (slotEndMinutes > end * 60) {
          continue
        }

        const hasConflict = bookedSlots.some(
          (bookedSlot) =>
            (slotStartMinutes >= bookedSlot.start &&
              slotStartMinutes < bookedSlot.end) ||
            (slotEndMinutes > bookedSlot.start &&
              slotEndMinutes <= bookedSlot.end) ||
            (slotStartMinutes <= bookedSlot.start &&
              slotEndMinutes >= bookedSlot.end)
        )

        if (!hasConflict) {
          availableSlots.push({
            start: this.minutesToTime(slotStartMinutes),
            end: this.minutesToTime(slotEndMinutes),
          })
        }
      }
    }

    return availableSlots
  }
  private minutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
  }
}

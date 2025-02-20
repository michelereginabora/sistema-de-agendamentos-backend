import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import { Appointment } from 'src/resources/appointments/entities/appointments.entity'
import { Service } from 'src/resources/services/entities/service.entity'
import { IServiceRepository } from 'src/resources/services/interfaces/service-repository.interface'
import { AvailabilityResponse } from '../interfaces/availability-response.interface'
import { BusinessHoursConfig } from '../interfaces/business-hours.interface'
import { TimeSlot } from '../interfaces/time-slot.interface'
import { IAvailabilityRepository } from '../interfaces/availability.repository.interface'

@Injectable()
export class AvailabilityService {
  constructor(
    @Inject('IServiceRepository')
    private readonly servicesRepository: IServiceRepository,
    @Inject('IAvailabilityRepository')
    private readonly availabilityRepository: IAvailabilityRepository
  ) {}

  async findAvailableSlots(
    serviceId: string,
    date: Date
  ): Promise<AvailabilityResponse> {
    const service = await this.validateService(serviceId)
    const appointments = await this.findAppointmentsByServiceAndDate(
      serviceId,
      date
    )

    // Configuração dos horários de funcionamento considerando o horário comercial
    const businessHours = {
      start: 9, // 9:00
      end: 18, // 18:00
      slotDuration: 30, // duração do slot em minutos
    }

    const availableSlots = this.calculateAvailableSlots(
      service,
      appointments,
      businessHours,
      date
    )

    return {
      serviceName: service.name,
      appointmentDate: date.toISOString(),
      availableSlots,
    }
  }

  // Método para validar o serviço
  private async validateService(serviceId: string): Promise<Service> {
    const service = await this.servicesRepository.findOne(serviceId)

    if (!service) {
      throw new NotFoundException('Serviço não encontrado')
    }

    return service
  }

  // Método para buscar as consultas (appointments) do serviço
  private async findAppointmentsByServiceAndDate(
    serviceId: string,
    date: Date
  ): Promise<Appointment[]> {
    return this.availabilityRepository.getServiceAppointments(
      serviceId,
      date
    ) as Promise<Appointment[]>
  }

  // Normalizar os horários de consultas (appointments)
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

  // Obtém o horário atual ajustado para o fuso correto (ex: UTC-3)
  private getCurrentMinutesForTimeZone(requestedDate: Date): number {
    const nowUTC = new Date()
    const requestedUTC = new Date(
      Date.UTC(
        requestedDate.getUTCFullYear(),
        requestedDate.getUTCMonth(),
        requestedDate.getUTCDate()
      )
    )

    const isToday =
      nowUTC.toISOString().split('T')[0] ===
      requestedUTC.toISOString().split('T')[0]
    const timeZoneOffset = -3 * 60 // UTC-3 em minutos

    let currentMinutesUTC = isToday
      ? nowUTC.getUTCHours() * 60 + nowUTC.getUTCMinutes() + timeZoneOffset
      : 0

    if (currentMinutesUTC < 0) {
      currentMinutesUTC = 0
    }

    if (isToday) {
      currentMinutesUTC = Math.ceil(currentMinutesUTC / 30) * 30
    }

    return currentMinutesUTC
  }

  // Verifica se um slot está disponível, comparando com horários já reservados
  private isSlotAvailable(
    slotStartMinutes: number,
    slotEndMinutes: number,
    bookedSlots: { start: number; end: number }[]
  ): boolean {
    return !bookedSlots.some(
      (bookedSlot) =>
        (slotStartMinutes >= bookedSlot.start &&
          slotStartMinutes < bookedSlot.end) ||
        (slotEndMinutes > bookedSlot.start &&
          slotEndMinutes <= bookedSlot.end) ||
        (slotStartMinutes <= bookedSlot.start &&
          slotEndMinutes >= bookedSlot.end)
    )
  }

  // Calcula os horários disponíveis com base nos agendamentos e horários de funcionamento
  private calculateAvailableSlots(
    service: Service,
    appointments: Appointment[],
    businessHours: BusinessHoursConfig,
    requestedDate: Date
  ): TimeSlot[] {
    const availableSlots: TimeSlot[] = []
    const { start, end } = businessHours
    const bookedSlots = this.normalizeBookedSlots(
      appointments,
      service.duration
    )
    const currentMinutesUTC = this.getCurrentMinutesForTimeZone(requestedDate)

    for (let hour = start; hour < end; hour++) {
      for (let minute = 0; minute < 60; minute += businessHours.slotDuration) {
        const slotStartMinutes = hour * 60 + minute
        const slotEndMinutes = slotStartMinutes + service.duration

        if (slotEndMinutes > end * 60 || slotStartMinutes < currentMinutesUTC) {
          continue
        }

        if (
          this.isSlotAvailable(slotStartMinutes, slotEndMinutes, bookedSlots)
        ) {
          availableSlots.push({
            start: this.minutesToTime(slotStartMinutes),
            end: this.minutesToTime(slotEndMinutes),
          })
        }
      }
    }

    return availableSlots
  }

  // Converte minutos para o formato de tempo
  private minutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
  }
}

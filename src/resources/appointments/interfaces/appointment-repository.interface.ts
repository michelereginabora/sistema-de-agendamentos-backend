import { CreateAppointmentDto } from '../dto/create-appointments.dto'
import { IAppointment } from './appointment.interface'

export interface IAppointmentRepository {
  save(appointment: CreateAppointmentDto): Promise<IAppointment>
  findByUserId(userId: string): Promise<IAppointment[]>
  findByUserIdWithService(userId: string): Promise<IAppointment[]>
  findByServiceId(serviceId: string): Promise<IAppointment[]>
  findByServiceIdWithService(serviceId: string): Promise<IAppointment[]>
}

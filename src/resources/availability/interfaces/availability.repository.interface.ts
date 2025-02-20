import { IAppointment } from 'src/resources/appointments/interfaces/appointment.interface'

export interface IAvailabilityRepository {
  getServiceAppointments(serviceId: string, date: Date): Promise<IAppointment[]>
}

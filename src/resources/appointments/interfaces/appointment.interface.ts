import { IService } from 'src/resources/services/interfaces/service.interface'
import { IUser } from 'src/resources/user/interfaces/user.interface'

export interface IAppointment {
  id: string
  userId: string
  serviceId: string
  appointmentDate: Date
  createdAt: Date
  user?: IUser
  service?: IService
}

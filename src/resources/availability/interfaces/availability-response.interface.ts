import { TimeSlot } from './time-slot.interface'

export interface AvailabilityResponse {
  serviceName: string
  appointmentDate: string // formato "YYYY-MM-DD"
  availableSlots: TimeSlot[]
}

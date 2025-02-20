import { Controller, Get, Query } from '@nestjs/common'
import { AvailabilityResponse } from '../interfaces/availability-response.interface'
import { AvailabilityService } from '../services/availability.service'


@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Get()
  async getAvailableSlots(
    @Query('serviceId') serviceId: string,
    @Query('date') date: string
  ): Promise<AvailabilityResponse> {
    const dateObj = new Date(date)
    return this.availabilityService.findAvailableSlots(serviceId, dateObj)
  }
}

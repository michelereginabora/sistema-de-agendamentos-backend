import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AppointmentService } from './appointments.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateAppointmentDto } from './dto/create-appointments.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RequestWithUser } from 'src/utils/requestWithUser';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  createAppointment(
    @Request() req: RequestWithUser,
    @Body() appointmentData: CreateAppointmentDto
  ) {
    return this.appointmentService.createAppointment(
      req.user.userId,
      appointmentData.serviceId,
      appointmentData
    );
  }

  @Get()
  async listAppointments(@Request() req: RequestWithUser) {
    return this.appointmentService.findUserAppointments(req.user.userId);
  }
}
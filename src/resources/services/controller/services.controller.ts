import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ServicesService } from '../services/services.service';
import { CreateServiceDto } from '../dto/create-service.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AdminGuard } from 'src/auth/guard/admin.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }
}
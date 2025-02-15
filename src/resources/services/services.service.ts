import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Service } from './service.entity'
import { CreateServiceDto } from './dto/create-service.dto'

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>
  ) {}

  findAll() {
    return this.servicesRepository.find()
  }

  create(createServiceDto: CreateServiceDto) {
    const service = this.servicesRepository.create(createServiceDto)
    return this.servicesRepository.save(service)
  }
}

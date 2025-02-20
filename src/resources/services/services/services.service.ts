import { Injectable, Inject } from '@nestjs/common'
import { CreateServiceDto } from '../dto/create-service.dto'
import { IServiceRepository } from '../interfaces/service-repository.interface'
import { IService } from '../interfaces/service.interface'

@Injectable()
export class ServicesService {
  constructor(
    @Inject('IServiceRepository')
    private readonly serviceRepository: IServiceRepository
  ) {}

  findAll(): Promise<IService[]> {
    return this.serviceRepository.findAll()
  }

  create(createServiceDto: CreateServiceDto): Promise<IService> {
    return this.serviceRepository.create(createServiceDto)
  }
}

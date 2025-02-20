import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity';
import { CreateServiceDto } from '../dto/create-service.dto';
import { IServiceRepository } from '../interfaces/service-repository.interface';
import { IService } from '../interfaces/service.interface';

@Injectable()
export class ServiceRepository implements IServiceRepository {
  constructor(
    @InjectRepository(Service)
    private readonly repository: Repository<Service>,
  ) {}

  async findAll(): Promise<IService[]> {
    return this.repository.find();
  }

  async create(data: CreateServiceDto): Promise<IService> {
    const service = this.repository.create(data);
    return this.repository.save(service);
  }

  async findOne(id: string): Promise<IService | null> {
    return this.repository.findOneBy({ id });
  }
}
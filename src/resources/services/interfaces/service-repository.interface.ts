import { CreateServiceDto } from '../dto/create-service.dto';
import { IService } from './service.interface';


export interface IServiceRepository {
  findAll(): Promise<IService[]>;
  create(data: CreateServiceDto): Promise<IService>;
}

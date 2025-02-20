import { CreateServiceDto } from '../dto/create-service.dto';
import { IService } from './service.interface';


export interface IServiceRepository {
  findAll(): Promise<IService[]>;
  findOne(id: string): Promise<IService | null>;
  create(data: CreateServiceDto): Promise<IService>;
}

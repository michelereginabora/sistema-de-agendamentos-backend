import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ServiceRepository } from './repositories/service.repository';
import { ServicesController } from './controller/services.controller';
import { ServicesService } from './services/services.service';


@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  controllers: [ServicesController],
  providers: [
    ServicesService,
    {
      provide: 'IServiceRepository',
      useClass: ServiceRepository,
    },
  ],
  exports: [ServicesService],
})
export class ServicesModule {}
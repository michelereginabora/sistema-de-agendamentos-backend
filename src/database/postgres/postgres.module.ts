import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/resources/user/entities/user.entity';
import { Service } from 'src/resources/services/entities/service.entity';
import { Appointment } from 'src/resources/appointments/appointments.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User, Service, Appointment],
        synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE') || true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class PostgresModule {}

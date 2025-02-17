// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './resources/user/user.module';
import { PostgresModule } from './database/postgres/postgres.module';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './resources/services/services.module';
import { AppointmentsModule } from './resources/appointments/appointments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostgresModule,
    UserModule,
    AuthModule,
    ServicesModule,
    AppointmentsModule,
  ],
})
export class AppModule {}

// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './resources/user/user.module';
import { PostgresModule } from './database/postgres/postgres.module';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './resources/services/services.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostgresModule,
    UserModule,
    AuthModule,
    ServicesModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { PropertiesModule } from './properties/properties.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { InsuranceModule } from './insurance/insurance.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    PrismaModule,
    HealthModule,
    AuthModule,
    PropertiesModule,
    UsersModule,
    InsuranceModule,
    AdminModule,
  ],
})
export class AppModule {}

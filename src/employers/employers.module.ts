import { Module } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { EmployersController } from './employers.controller';
import { PrismaService } from '../prisma.service';
import { EmployerPaymentsService } from './employer-payments.service';
import { EmployerPaymentsController } from './employer-payments.controller';

@Module({
  providers: [EmployersService, PrismaService, EmployerPaymentsService],
  controllers: [EmployersController, EmployerPaymentsController],
})
export class EmployersModule {}

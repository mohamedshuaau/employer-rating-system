import { Controller, Get } from '@nestjs/common';
import { EmployerPayment } from '@prisma/client';
import { PrismaService } from '../prisma.service';

/**
 * Employer Payments controller
 */
@Controller('employer-payments')
export class EmployerPaymentsController {}

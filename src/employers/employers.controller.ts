import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { Employer } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { EmployerPaymentsService } from './employer-payments.service';
import { EmployersService } from './employers.service';
import { CreateEmployerPaymentDto } from './dto/create-employer-payment.dto';
import { PaginationDto } from './dto/pagination.dto';

/**
 * Employer Controller
 */
@Controller('employers')
export class EmployersController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly employerPaymentService: EmployerPaymentsService,
    private readonly employerService: EmployersService,
  ) {}

  /**
   * Get all active employers
   */
  @Get('/all')
  async getAllActiveEmployers(): Promise<Employer[]> {
    return this.employerService.getAllActiveEmployers();
  }

  /**
   * Create a Payment for an employer
   *
   * @param createEmployerPaymentDto
   */
  @Post('/create-payment')
  async createPayment(
    @Body(ValidationPipe) createEmployerPaymentDto: CreateEmployerPaymentDto,
  ): Promise<string> {
    return await this.employerPaymentService.createPayment(
      createEmployerPaymentDto,
    );
  }

  /**
   * Get employer payment history
   */
  @Get('/reports/employer-payment-history-report')
  async getEmployerPaymentHistoryReport(
    @Query(new ValidationPipe({ transform: true }))
    paginationDto: PaginationDto,
  ): Promise<object> {
    return await this.employerPaymentService.getEmployerPaymentHistoryReport(
      paginationDto,
    );
  }

  /**
   * Get employer rating report
   */
  @Get('/reports/employer-rating-report')
  async getEmployerRatingReport(
    @Query(new ValidationPipe({ transform: true }))
    paginationDto: PaginationDto,
  ): Promise<object> {
    return await this.employerService.getEmployerRatingReport(paginationDto);
  }
}

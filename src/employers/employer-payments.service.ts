import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEmployerPaymentDto } from './dto/create-employer-payment.dto';
import * as moment from 'moment';
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_DATETIME_FORMAT,
  PAYMENT_STATUS_PENDING,
} from '../../utils/constants';
import { PaginationDto } from './dto/pagination.dto';
import { EmployersService } from './employers.service';

/**
 * Employer Payment Service
 */
@Injectable()
export class EmployerPaymentsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly employerService: EmployersService,
  ) {}

  /**
   * Create payment for employer
   *
   * @param createEmployerPaymentDto
   */
  async createPayment(
    createEmployerPaymentDto: CreateEmployerPaymentDto,
  ): Promise<any> {
    const { employer_id, due_date, contribution_month } =
      createEmployerPaymentDto;
    const _contribution_month = moment(contribution_month);
    const _due_date = moment(due_date);
    const employer = await this.prismaService.employer.findFirst({
      where: {
        id: employer_id,
      },
      include: {
        employer_payments: true,
      },
    });

    const existing_payment = await this.prismaService.employerPayment.findFirst(
      {
        where: {
          employer_id: employer_id,
          contribution_month: _contribution_month.format(
            DEFAULT_DATETIME_FORMAT,
          ),
        },
      },
    );
    // if the payment exists, throw error
    if (existing_payment !== null) {
      throw new BadRequestException(
        'A payment already exists for the given employer & contribution month',
      );
    }

    // if both dates are the same (month wise included), throw error
    if (
      _contribution_month.get('month') === _due_date.get('month') ||
      _contribution_month.format(DEFAULT_DATE_FORMAT) ===
        _due_date.format(DEFAULT_DATE_FORMAT)
    ) {
      throw new BadRequestException(
        'The due date and contribution date cannot be the same date/month',
      );
    }

    // checks if due date is set to the next months 15th starting from contribution month
    if (
      _due_date.format(DEFAULT_DATE_FORMAT) !==
      _contribution_month
        .clone()
        .add(1, 'months')
        .startOf('month')
        .add(14, 'days')
        .format(DEFAULT_DATE_FORMAT)
    ) {
      throw new BadRequestException(
        'Due date must be set on the next months 15 from contribution month',
      );
    }

    await this.prismaService.employerPayment.create({
      data: {
        employer: {
          connect: {
            id: employer_id,
          },
        },
        due_date: _due_date.format(DEFAULT_DATETIME_FORMAT),
        contribution_month: _contribution_month.format(DEFAULT_DATETIME_FORMAT),
        payment_status: PAYMENT_STATUS_PENDING,
      },
    });

    // calculate and update employer ratings
    await this.employerService.calculateAndUpdateEmployerRatings(employer);

    return 'Created Payment Successfully!';
  }

  /**
   * Get employer payment history report
   * Again, the pagination could have been its own separate thing extended from elsewhere but running out of time
   */
  async getEmployerPaymentHistoryReport(
    paginationDto: PaginationDto,
  ): Promise<object> {
    const { page = 1, limit = 10 } = paginationDto;
    let _page = page;
    const _limit = 500;

    // calculate the total number of items and total pages
    const total_items = await this.prismaService.employerPayment.count({
      take: _limit,
    });
    const total_pages = Math.ceil(total_items / limit);

    if (_page > total_pages) {
      _page = 50;
    }

    if (_page == 0) {
      _page = 1;
    }

    // calculate offset
    const offset = (_page - 1) * limit;

    // take payments with an offset (to skip depending on page and limit)
    const payments = await this.prismaService.employerPayment.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        payment_date: 'desc',
      },
      include: {
        employer: true,
      },
    });

    return {
      data: payments,
      meta: {
        total_items,
        total_pages,
        current_page: _page,
      },
    };
  }
}

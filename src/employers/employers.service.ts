import { Injectable } from '@nestjs/common';
import { Employer, EmployerPayment } from '@prisma/client';
import * as moment from 'moment';
import {
  DEFAULT_DATETIME_FORMAT,
  STAR_CRAWLER,
  STAR_GOLD,
  STAR_PLATINUM,
  STAR_SILVER,
} from '../../utils/constants';
import { PrismaService } from '../prisma.service';
import { PaginationDto } from './dto/pagination.dto';

/**
 * Employer Service
 */
@Injectable()
export class EmployersService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Get all active employers
   */
  async getAllActiveEmployers(): Promise<Employer[]> {
    return await this.prismaService.employer.findMany({
      where: {
        is_active: true,
      },
    });
  }

  /**
   * Calculates and updates the point and star ratings for the given employer
   *
   * @param employer
   */
  async calculateAndUpdateEmployerRatings(employer): Promise<any> {
    const point_rating = this.calculateEmployerPointRating(employer);
    const star_rating = this.calculateEmployerStarRating(employer);
    await this.prismaService.employer.update({
      where: {
        id: employer.id,
      },
      data: {
        point_rating: point_rating.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0,
        ),
        star_rating,
      },
    });
  }

  /**
   * Calculates Employers point rating
   *
   * @param employer
   */
  calculateEmployerPointRating(employer): [number, number, number, number] {
    let not_paid = 0;
    let paid_before_due_date = 0;
    let paid_within_3_months_after_due = 0;
    let paid_3_months_after_due = 0;

    employer.employer_payments.map((payment: EmployerPayment) => {
      const payment_date = moment(payment.payment_date);
      const due_date = moment(payment.due_date);

      // if employer did not pay, deduct 3 points
      if (!payment.payment_date) {
        not_paid += -3;
        return true;
      }

      // if the employer paid on time, add 3 points
      if (
        payment_date.clone().format(DEFAULT_DATETIME_FORMAT) <=
        due_date.clone().format(DEFAULT_DATETIME_FORMAT)
      ) {
        paid_before_due_date += 3;
        return true;
      }

      // if employer has paid after the due date but paid within 3 months, add 2 points
      if (payment_date.isBetween(due_date, due_date.clone().add(3, 'months'))) {
        paid_within_3_months_after_due += 2;
        return true;
      }

      // if employer has paid after 3 months, add 1 point
      if (payment_date.isBetween(due_date.clone().add(3, 'months'), moment())) {
        paid_3_months_after_due += 1;
        return true;
      }
    });

    return [
      not_paid,
      paid_before_due_date,
      paid_within_3_months_after_due,
      paid_3_months_after_due,
    ];
  }

  /**
   * Calculates Employer Star Rating
   *
   * @param employer
   */
  calculateEmployerStarRating(employer): string {
    const payments = employer.employer_payments
      .sort((a, b) => b.id - a.id)
      .slice(0, 12);

    return this.calculateStarRating(payments);
  }

  /**
   * Determines which category of star rating employer falls to
   *
   * @param payments
   */
  calculateStarRating(payments): string {
    let platinum = 0;
    let gold = 0;
    let silver = 0;
    let crawler = 0;

    const platinum_records = payments.slice(0, 12);
    const gold_records = payments.slice(0, 6);
    const silver_records = payments.slice(0, 3);
    const crawler_records = payments.slice(0, 3);

    platinum = platinum_records.filter(
      (payment) => payment.payment_date !== null,
    ).length;

    gold = gold_records.filter(
      (payment) => payment.payment_date !== null,
    ).length;

    silver = silver_records.filter(
      (payment) => payment.payment_date !== null,
    ).length;

    crawler = crawler_records.filter(
      (payment) => payment.payment_date === null,
    ).length;

    if (platinum === 12) {
      return STAR_PLATINUM;
    }
    if (gold >= 6) {
      return STAR_GOLD;
    }
    if (silver >= 3) {
      return STAR_SILVER;
    }
    if (crawler >= 3) {
      return STAR_CRAWLER;
    }

    // if every odd fails
    return 'unknown';
  }

  /**
   * Get employer ratings report
   * I would have made pagination separate. But I guess its fine for now
   *
   * @param paginationDto
   */
  async getEmployerRatingReport(paginationDto: PaginationDto): Promise<object> {
    const { page = 1, limit = 10 } = paginationDto;
    let _page = page;
    const _limit = 500;

    // calculate the total number of items and total pages
    const total_items = await this.prismaService.employer.count({
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
    const payments = await this.prismaService.employer.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        point_rating: 'desc',
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

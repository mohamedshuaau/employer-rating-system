import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { generateDateArray, generatePrice, getRandomDateBetween } from "../utils/helpers";
import * as moment from "moment";
import { DEFAULT_DATETIME_FORMAT, PAYMENT_STATUS_PAID, PAYMENT_STATUS_PENDING } from "../utils/constants";
import { EmployersService } from "../src/employers/employers.service";
import { PrismaService } from "../src/prisma.service";

const prisma = new PrismaClient();
const employerService = new EmployersService(new PrismaService());

/**
 * Plant the seeds
 */
async function main() {
  // create 50 random employees
  await createEmployees();

  // modify payment history
  await modifyEmployerPayments();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

/**
 * Creates 50 employees
 * This also creates a payment history for each employee for each month within the given date range
 */
async function createEmployees() {
  const totalEmployers = 50;

  const employers = [];

  for (let i = 0; i < totalEmployers; i++) {
    const employer = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      contact_number: faker.phone.number()
    };

    employers.push(employer);
  }

  const start_date = new Date("2020-01-14 23:59:59");
  const end_date = new Date("2023-07-15 00:00:00");

  const dates = generateDateArray(start_date, end_date);

  await prisma.employer.createMany({ data: employers });
  const all_employers = await prisma.employer.findMany();

  for (const employer of all_employers) {
    for (const date of dates) {
      let due_date = moment(date).clone();
      due_date = due_date.add(1, "months").add(1, "days");

      // create a payment for each employer for each month
      await prisma.employerPayment.create({
        data: {
          employer: {
            connect: {
              id: employer.id
            }
          },
          contribution_month: date,
          payment_date: null,
          due_date: due_date.format(DEFAULT_DATETIME_FORMAT),
          paid_amount: null,
          payment_status: PAYMENT_STATUS_PENDING
        }
      });
    }
  }
}

/**
 * Modifies the employer seeded payments
 * 10% didn't pay.
 * 20% paid within 3 months after the due date.
 * 20% paid after 3 months from due date
 * 50% paid on time
 */
async function modifyEmployerPayments() {
  // Get the total count of employers
  const totalCount = await prisma.employer.count();

  // Calculate the number of records for each percentage
  const ten_percent_count = Math.ceil(0.1 * totalCount);
  const twenty_percent_count = Math.ceil(0.2 * totalCount);
  const fifty_percent_count = Math.ceil(0.5 * totalCount);

  // get 10% employers
  const ten_percent_employers = await prisma.employer.findMany({
    take: ten_percent_count,
    include: {
      employer_payments: true,
    },
  });

  // get 20% employers
  const twenty_percent_employers = await prisma.employer.findMany({
    skip: ten_percent_count, // Skip the previous 10%
    take: twenty_percent_count,
    include: {
      employer_payments: true,
    },
  });

  // get 20% employers
  const _twenty_percent_employers = await prisma.employer.findMany({
    skip: ten_percent_count + twenty_percent_count, // Skip the previous 10% + 20%
    take: twenty_percent_count,
    include: {
      employer_payments: true,
    },
  });

  // get 50% employers
  const fifty_percent_employers = await prisma.employer.findMany({
    skip: ten_percent_count + twenty_percent_count + twenty_percent_count, // Skip the previous 10% + 20% + 20%
    take: fifty_percent_count,
    include: {
      employer_payments: true,
    },
  });

  // 10% did not pay
  ten_percent_employers.map(() => {
    // we don't need anything from these guys. cheapskates didn't pay
  });

  // 20% paid after the due date but within three months
  for (const employer of twenty_percent_employers) {
    for (const payment of employer.employer_payments) {
      const due_date = moment(payment.due_date);
      const three_months_after_due_date = due_date.clone().add(3, 'months');
      const random_payment_date = getRandomDateBetween(
        due_date.format(DEFAULT_DATETIME_FORMAT),
        three_months_after_due_date.format(DEFAULT_DATETIME_FORMAT),
      );

      await prisma.employerPayment.update({
        where: {
          id: payment.id,
        },
        data: {
          payment_date: random_payment_date,
          paid_amount: generatePrice(100, 1500),
          payment_status: PAYMENT_STATUS_PAID,
        },
      });
    }
  }

  // 20% paid 3 months after the due date
  for (const employer of _twenty_percent_employers) {
    for (const payment of employer.employer_payments) {
      const due_date = moment(payment.due_date);
      const three_months_after_due_date = due_date.clone().add(4, 'months');
      const random_month = due_date.clone().add(6, 'months');
      const random_payment_date = getRandomDateBetween(
        three_months_after_due_date.format(DEFAULT_DATETIME_FORMAT),
        random_month.format(DEFAULT_DATETIME_FORMAT),
      );

      await prisma.employerPayment.update({
        where: {
          id: payment.id,
        },
        data: {
          payment_date: random_payment_date,
          paid_amount: generatePrice(100, 1500),
          payment_status: PAYMENT_STATUS_PAID,
        },
      });
    }
  }

  // 50% paid on time
  for (const employer of fifty_percent_employers) {
    for (const payment of employer.employer_payments) {
      const contribution_month = moment(payment.contribution_month);
      const due_date = moment(payment.due_date).clone().subtract(1, 'day');
      const random_payment_date = getRandomDateBetween(
        contribution_month.format(DEFAULT_DATETIME_FORMAT),
        due_date.format(DEFAULT_DATETIME_FORMAT),
      );

      await prisma.employerPayment.update({
        where: {
          id: payment.id,
        },
        data: {
          payment_date: random_payment_date,
          paid_amount: generatePrice(100, 1500),
          payment_status: PAYMENT_STATUS_PAID,
        },
      });
    }
  }

  // update all employers ratings
  await prisma.employer.findMany({
    include: {
      employer_payments: true,
    },
  }).then((employers) => {
    employers.forEach((employer) => {
      employerService.calculateAndUpdateEmployerRatings(employer);
    })
  });
}

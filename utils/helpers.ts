import * as moment from 'moment';
import { DEFAULT_DATETIME_FORMAT } from './constants';

/**
 * Generates a date range
 *
 * @param start_date
 * @param end_date
 */
export function generateDateArray(start_date, end_date) {
  const startDate = moment(start_date);
  const endDate = moment(end_date);
  const datesArray = [];

  // Start with the first day of the start date's month
  const currentDate = startDate.clone();

  while (currentDate <= endDate) {
    datesArray.push(currentDate.format('YYYY-MM-DD HH:mm:ss'));
    currentDate.add(1, 'month');
  }

  return datesArray;
}

/**
 * Generate a random date between two provided dates
 *
 * @param start_date
 * @param end_date
 */
export function getRandomDateBetween(start_date, end_date) {
  const start = moment(start_date);
  const end = moment(end_date);
  const daysDifference = end.diff(start, 'days');

  // Generate a random number between 0 and the number of days difference
  const randomDays = Math.floor(Math.random() * (daysDifference + 1));

  // Add the random number of days to the start date to get the random date
  const randomDate = start.clone().add(randomDays, 'days');

  // voila
  return randomDate.format(DEFAULT_DATETIME_FORMAT);
}

/**
 * Generate a paid price
 *
 * @param min
 * @param max
 */
export function generatePrice(min, max) {
  return Math.random() * (max - min) + min;
}

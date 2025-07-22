import { type DateObject } from "../types/type";
import { bsMonthDays, firstDayOfYearWeekdayMap } from "../constants/Constant";

export function isBefore(d1: DateObject, d2: DateObject) {
  return (
    d1.year < d2.year ||
    (d1.year === d2.year && d1.month < d2.month) ||
    (d1.year === d2.year && d1.month === d2.month && d1.day < d2.day)
  );
}

export function isAfter(d1: DateObject, d2: DateObject) {
  return (
    d1.year > d2.year ||
    (d1.year === d2.year && d1.month > d2.month) ||
    (d1.year === d2.year && d1.month === d2.month && d1.day > d2.day)
  );
}

export function getFirstDayOfMonthWeekday(date: DateObject) {
  const yearData = bsMonthDays[date.year];
  if (!yearData) return 0;
  const daysBefore = yearData
    .slice(0, date.month - 1)
    .reduce((a, b) => a + b, 0);
  return (firstDayOfYearWeekdayMap[date.year] + daysBefore) % 7;
}

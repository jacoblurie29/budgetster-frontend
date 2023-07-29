import { TimePeriod } from "../../types/types";
import type { MonetaryItem } from "../../types/types";

/**
 * Return true is all fields expect _id are equal
 * @param {MonetaryItem} a MonetaryItem
 * @param {MonetaryItem} b MonetaryItem
 */
export const compareMonetaryItems = (a: MonetaryItem, b: MonetaryItem) =>
  a.name === b.name &&
  a.value === b.value &&
  a.date === b.date &&
  a.repeat === b.repeat &&
  a.repeatPeriod === b.repeatPeriod &&
  a.repeatEndDate === b.repeatEndDate &&
  a.type === b.type;

export const isViewable = (
  item: MonetaryItem,
  month: number,
  year: number,
  range: Omit<TimePeriod, "weekly">
) => {
  // Get the start date of the item
  const startDateFromObject = new Date(item.date);

  // Reset the start date to the first of the month (for comparison)
  const startDate = new Date(
    startDateFromObject.getFullYear(),
    startDateFromObject.getMonth(),
    1
  );

  // Get the current date of the time control from redux
  const currentDate = new Date(year, month, 1);

  // filter by year if the range is yearly or if the item is repeating
  if (range === TimePeriod.YEARLY) {
    return (
      startDate.getFullYear() === year ||
      (item.repeat &&
        item.repeatEndDate &&
        startDate.getFullYear() <= year &&
        new Date(item.repeatEndDate).getFullYear() >= year)
    );

    // filter by month if the range is monthly or if the item is repeating
  } else {
    return (
      (!item.repeat &&
        startDate.getMonth() === month &&
        startDate.getFullYear() === year) ||
      (item.repeat &&
        item.repeatEndDate &&
        startDate <= currentDate &&
        new Date(item.repeatEndDate) >= currentDate)
    );
  }
};

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
  const itemDate = new Date(item.date);

  // filter by year if the range is yearly or if the item is repeating
  if (range === TimePeriod.YEARLY) {
    return (
      itemDate.getFullYear() === year ||
      (item.repeat &&
        itemDate.getFullYear() <= year &&
        (!item.repeatEndDate ||
          new Date(item.repeatEndDate).getFullYear() >= year))
    );

    // filter by month if the range is monthly or if the item is repeating
  } else {
    return (
      // If it repeats yearly, check if the month is the same and the it is after the start date (.date)
      // If it repeats monthly, check if it is after the start date (.date)
      // If it doesn't repeat, check if the month and year are the same
      // The repeat end date is optional so if there is no repeat end date, assume it repeats forever
      (item.repeat &&
        item.repeatPeriod === TimePeriod.YEARLY &&
        itemDate.getMonth() === month &&
        itemDate.getFullYear() <= year &&
        (!item.repeatEndDate ||
          new Date(item.repeatEndDate).getFullYear() >= year)) ||
      (item.repeat &&
        item.repeatPeriod === TimePeriod.MONTHLY &&
        itemDate.getFullYear() <= year &&
        (!item.repeatEndDate ||
          new Date(item.repeatEndDate).getFullYear() >= year)) ||
      (!item.repeat &&
        itemDate.getMonth() === month &&
        itemDate.getFullYear() === year)
    );
  }
};

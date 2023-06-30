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

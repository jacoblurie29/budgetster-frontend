/* eslint-disable autofix/no-unused-vars */

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  imageUri?: string;
  monetaryItems: MonetaryItem[];
}

/**
 * @interface MonetaryItem - Interface for a monetary item.
 *
 * @param {string} _id - The unique identifier of the monetary item.
 * @param {string} name - The name of the monetary item.
 * @param {number} value - The value of the monetary item.
 * @param {Date} date - The date of the monetary item.
 * @param {boolean} repeat - The repeat status of the monetary item.
 * @param {TimePeriod} repeatPeriod - (optional) The repeat period of the monetary item (weekly, monthly, yearly).
 * @param {Date} repeatEndDate - (optional) The repeat end date of the monetary item.
 * @param {MonetaryItemCategory} type - The type of the monetary item (income, expense, savings, investment).
 */
export interface MonetaryItem {
  id: string;
  name: string;
  value: number;
  date: Date;
  repeat: boolean;
  repeatPeriod?: TimePeriod;
  repeatEndDate?: Date;
  type: MonetaryItemCategory;
}

/**
 * @enum MonetaryItem - Interface for a monetary item.
 *
 * @param {string} MONTHLY - The component displays a monthly outlook.
 * @param {string} YEARLY - The component displays a yearly outlook.
 */
export enum TimePeriod {
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

/**
 * @enum MonetaryItemCategory - Enum for the type of a monetary item.
 *
 * @param {string} INCOME - The monetary item is an income.
 * @param {string} EXPENSE - The monetary item is an expense.
 * @param {string} SAVINGS - The monetary item is a savings.
 * @param {string} INVESTMENT - The monetary item is an investment.
 */
export enum MonetaryItemCategory {
  INCOME = "income",
  EXPENSE = "expenses",
  SAVINGS = "savings",
  INVESTMENT = "investment",
}

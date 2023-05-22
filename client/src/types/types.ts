/**
 * @interface MonetaryItem - Interface for a monetary item.
 *
 * @param {string} name - The name of the monetary item.
 * @param {number} value - The value of the monetary item.
 * @param {string} type - The type of the monetary item.
 */
export interface MonetaryItem {
  name: string;
  value: number;
  type: MonetaryItemType;
}

/**
 * @enum MonetaryItem - Interface for a monetary item.
 *
 * @param {string} MONTHLY - The component displays a monthly outlook.
 * @param {string} YEARLY - The component displays a yearly outlook.
 */
export enum TimePeriod {
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

/**
 * @enum MonetaryItemType - Enum for the type of a monetary item.
 *
 * @param {string} INCOME - The monetary item is an income.
 * @param {string} EXPENSE - The monetary item is an expense.
 * @param {string} SAVINGS - The monetary item is a savings.
 * @param {string} INVESTMENT - The monetary item is an investment.
 */
export enum MonetaryItemType {
  INCOME = "income",
  EXPENSE = "expense",
  SAVINGS = "savings",
  INVESTMENT = "investment",
}

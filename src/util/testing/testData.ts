import { MonetaryItemCategory, TimePeriod } from "../../types/types";
import type { MonetaryItem } from "../../types/types";

// Test data for the Expenses page
export const testExpensesData = [
  {
    _id: "0",
    name: "Rent",
    value: 1000,
    date: new Date().toISOString(),
    repeat: true,
    repeatPeriod: TimePeriod.MONTHLY,
    repeatEndDate: new Date(new Date().getFullYear() + 1).toISOString(),
    type: MonetaryItemCategory.EXPENSE,
  },
  {
    _id: "1",
    name: "Groceries",
    value: 500,
    repeat: true,
    repeatPeriod: TimePeriod.MONTHLY,
    repeatEndDate: new Date(new Date().getFullYear() + 1).toISOString(),
    type: MonetaryItemCategory.EXPENSE,
  },
  {
    _id: "2",
    name: "Gas",
    value: 100,
    repeat: true,
    repeatPeriod: TimePeriod.MONTHLY,
    repeatEndDate: new Date(new Date().getFullYear() + 1).toISOString(),
    type: MonetaryItemCategory.EXPENSE,
  },
  {
    _id: "3",
    name: "Car Insurance",
    value: 200,
    repeat: true,
    repeatPeriod: TimePeriod.MONTHLY,
    repeatEndDate: new Date(new Date().getFullYear() + 1).toISOString(),
    type: MonetaryItemCategory.EXPENSE,
  },
] as MonetaryItem[];

// Test data for the Incomes page
export const testIncomesData = [
  {
    _id: "4",
    name: "Paycheck",
    value: 2000,
    repeat: true,
    repeatPeriod: TimePeriod.MONTHLY,
    repeatEndDate: new Date(new Date().getFullYear() + 1).toISOString(),
    type: MonetaryItemCategory.INCOME,
  },
  {
    _id: "5",
    name: "Side Hustle",
    value: 500,
    repeat: true,
    repeatPeriod: TimePeriod.MONTHLY,
    repeatEndDate: new Date(new Date().getFullYear() + 1).toISOString(),
    type: MonetaryItemCategory.INCOME,
  },
] as MonetaryItem[];

// Test data for the Savings/Investments page
export const testSavingsInvestmentsData = [
  {
    _id: "6",
    name: "Emergency Fund",
    value: 1000,
    repeat: true,
    repeatPeriod: TimePeriod.MONTHLY,
    repeatEndDate: new Date(new Date().getFullYear() + 1).toISOString(),
    type: MonetaryItemCategory.SAVINGS,
  },
  {
    _id: "7",
    name: "401k",
    value: 500,
    repeat: true,
    repeatPeriod: TimePeriod.MONTHLY,
    repeatEndDate: new Date(new Date().getFullYear() + 1).toISOString(),
    type: MonetaryItemCategory.INVESTMENT,
  },
  {
    _id: "8",
    name: "Roth IRA",
    value: 500,
    repeat: true,
    repeatPeriod: TimePeriod.MONTHLY,
    repeatEndDate: new Date(new Date().getFullYear() + 1).toISOString(),
    type: MonetaryItemCategory.INVESTMENT,
  },
] as MonetaryItem[];

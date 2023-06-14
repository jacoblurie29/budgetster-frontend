import { MonetaryItemCategory, TimePeriod } from "../../types/types";
import type { MonetaryItem } from "../../types/types";

// Test data for the Expenses page
export const testExpensesData = [
  {
    id: "0",
    name: "Rent",
    value: 1000,
    date: new Date(),
    repeat: true,
    repeatPeriod: TimePeriod.MONTHLY,
    repeatEndDate: new Date(new Date().getFullYear() + 1),
    type: MonetaryItemCategory.EXPENSE,
  },
  {
    id: "1",
    name: "Groceries",
    value: 500,
    repeat: true,
    repeatPeriod: TimePeriod.MONTHLY,
    repeatEndDate: new Date(new Date().getFullYear() + 1),
    type: MonetaryItemCategory.EXPENSE,
  },
  {
    id: "2",
    name: "Gas",
    value: 100,
    repeat: true,
    repeatPeriod: TimePeriod.MONTHLY,
    repeatEndDate: new Date(new Date().getFullYear() + 1),
    type: MonetaryItemCategory.EXPENSE,
  },
  {
    id: "3",
    name: "Car Insurance",
    value: 200,
    repeat: true,
    repeatPeriod: TimePeriod.MONTHLY,
    repeatEndDate: new Date(new Date().getFullYear() + 1),
    type: MonetaryItemCategory.EXPENSE,
  },
] as MonetaryItem[];

// Test data for the Incomes page
export const testIncomesData = [
  {
    id: "4",
    name: "Paycheck",
    value: 2000,
    repeat: true,
    repeatPeriod: TimePeriod.MONTHLY,
    repeatEndDate: new Date(new Date().getFullYear() + 1),
    type: MonetaryItemCategory.INCOME,
  },
  {
    id: "5",
    name: "Side Hustle",
    value: 500,
    repeat: true,
    repeatPeriod: TimePeriod.MONTHLY,
    repeatEndDate: new Date(new Date().getFullYear() + 1),
    type: MonetaryItemCategory.INCOME,
  },
] as MonetaryItem[];

// Test data for the Savings/Investments page
export const testSavingsInvestmentsData = [
  {
    id: "6",
    name: "Emergency Fund",
    value: 1000,
    repeat: true,
    repeatPeriod: TimePeriod.MONTHLY,
    repeatEndDate: new Date(new Date().getFullYear() + 1),
    type: MonetaryItemCategory.SAVINGS,
  },
  {
    id: "7",
    name: "401k",
    value: 500,
    repeat: true,
    repeatPeriod: TimePeriod.MONTHLY,
    repeatEndDate: new Date(new Date().getFullYear() + 1),
    type: MonetaryItemCategory.INVESTMENT,
  },
  {
    id: "8",
    name: "Roth IRA",
    value: 500,
    repeat: true,
    repeatPeriod: TimePeriod.MONTHLY,
    repeatEndDate: new Date(new Date().getFullYear() + 1),
    type: MonetaryItemCategory.INVESTMENT,
  },
] as MonetaryItem[];

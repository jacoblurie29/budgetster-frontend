import { MonetaryItemType } from "../types/types";

export const testExpensesData = [
  {
    name: "Rent",
    value: 1000,
    type: MonetaryItemType.EXPENSE,
  },
  {
    name: "Groceries",
    value: 500,
    type: MonetaryItemType.EXPENSE,
  },
  {
    name: "Gas",
    value: 100,
    type: MonetaryItemType.EXPENSE,
  },
  {
    name: "Car Insurance",
    value: 200,
    type: MonetaryItemType.EXPENSE,
  },
];

export const testIncomesData = [
  {
    name: "Paycheck",
    value: 2000,
    type: MonetaryItemType.INCOME,
  },
  {
    name: "Side Hustle",
    value: 500,
    type: MonetaryItemType.INCOME,
  },
];

export const testSavingsInvestmentsData = [
  {
    name: "Emergency Fund",
    value: 1000,
    type: MonetaryItemType.SAVINGS,
  },
  {
    name: "401k",
    value: 500,
    type: MonetaryItemType.INVESTMENT,
  },
  {
    name: "Roth IRA",
    value: 500,
    type: MonetaryItemType.INVESTMENT,
  },
];

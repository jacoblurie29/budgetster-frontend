import { MonetaryCategory } from "../types/types";

// Test data for the Expenses page
export const testExpensesData = [
  {
    name: "Rent",
    value: 1000,
    type: MonetaryCategory.EXPENSE,
  },
  {
    name: "Groceries",
    value: 500,
    type: MonetaryCategory.EXPENSE,
  },
  {
    name: "Gas",
    value: 100,
    type: MonetaryCategory.EXPENSE,
  },
  {
    name: "Car Insurance",
    value: 200,
    type: MonetaryCategory.EXPENSE,
  },
];

// Test data for the Incomes page
export const testIncomesData = [
  {
    name: "Paycheck",
    value: 2000,
    type: MonetaryCategory.INCOME,
  },
  {
    name: "Side Hustle",
    value: 500,
    type: MonetaryCategory.INCOME,
  },
];

// Test data for the Savings/Investments page
export const testSavingsInvestmentsData = [
  {
    name: "Emergency Fund",
    value: 1000,
    type: MonetaryCategory.SAVINGS,
  },
  {
    name: "401k",
    value: 500,
    type: MonetaryCategory.INVESTMENT,
  },
  {
    name: "Roth IRA",
    value: 500,
    type: MonetaryCategory.INVESTMENT,
  },
];

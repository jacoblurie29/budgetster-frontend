import { gql } from "@apollo/client";

export const UpdateUserBudgetMutation = gql`
  mutation UpdateUserBudgetMutation($budget: Float!) {
    updateUserBudget(budget: $budget) {
      budget
    }
  }
`;

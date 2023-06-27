import { gql } from "@apollo/client";

export const AllMonetaryItemsQuery = gql`
  query AllMonetaryItemsQuery {
    getMonetaryItems {
      _id
      name
      value
      date
      repeat
      repeatPeriod
      repeatEndDate
      type
    }
  }
`;

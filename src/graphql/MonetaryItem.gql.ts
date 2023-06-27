import { gql } from "@apollo/client";

/**
 * Query to get all monetary items from the database.
 */
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

/**
 * Query to get all monetary items from the database by type.
 */
export const GetMonetaryItemsByTypeQuery = gql`
  query GetMonetaryItemsByTypeQuery($type: String!) {
    getMonetaryItemsByType(type: $type) {
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

/**
 * Mutation to add a monetary item to the database.
 */
export const AddMonetaryItemMutation = gql`
  mutation AddMonetaryItemMutation($monetaryItem: MonetaryItemInput!) {
    addMonetaryItem(monetaryItem: $monetaryItem) {
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

/**
 * Mutation to update a monetary item in the database.
 */
export const UpdateMonetaryItemMutation = gql`
  mutation UpdateMonetaryItemMutation($monetaryItem: MonetaryItemInput!) {
    updateMonetaryItem(monetaryItem: $monetaryItem) {
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

/**
 * Mutation to delete a monetary item from the database.
 */
export const DeleteMonetaryItemMutation = gql`
  mutation DeleteMonetaryItemMutation($id: String!) {
    deleteMonetaryItem(id: $id) {
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

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
export const CreateMonetaryItemMutation = gql`
  mutation CreateMonetaryItemMutation($monetaryItem: MonetaryItemInput!) {
    createMonetaryItem(monetaryItem: $monetaryItem) {
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
  mutation UpdateMonetaryItemMutation($monetaryItem: MonetaryItemUpdate!) {
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
  mutation DeleteMonetaryItemMutation($_id: String!) {
    deleteMonetaryItem(_id: $_id) {
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
 * Mutation to delete all monetary items from the database.
 */
export const DeleteMonetaryItemsMutation = gql`
  mutation DeleteMonetaryItemsMutation($_ids: [String]!) {
    deleteMonetaryItems(_ids: $_ids) {
      deletedCount
    }
  }
`;

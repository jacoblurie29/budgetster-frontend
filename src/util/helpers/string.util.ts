import type { User } from "../../types/types";

/**
 * Format the title of the page (capitalize first letter and pluralize if necessary)
 * @param value - string to format
 */
export const formatTitle = (value: string) => {
  if (value === "expense") value = "expenses";
  return capitalizeFirstLetter(value);
};

/**
 * Capitalize first letter of a string (will only capitalize first word)
 * @param value - string to capitalize
 */
export const capitalizeFirstLetter = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

/**
 * Get the initials of a user
 * @returns two characters (first letter of first name and first letter of last name) capitalized
 */
export const getInitials = (user: User) =>
  user.firstName.charAt(0).toLocaleUpperCase() +
  user.lastName.charAt(0).toLocaleUpperCase();

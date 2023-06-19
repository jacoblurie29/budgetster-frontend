/**
 * Capitalize first letter of a string (will only capitalize first word)
 * @param value - string to capitalize
 */
export const capitalizeFirstLetter = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

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

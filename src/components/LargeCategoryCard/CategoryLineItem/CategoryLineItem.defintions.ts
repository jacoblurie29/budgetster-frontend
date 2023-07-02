import type { TimePeriod } from "../../../types/types";

/**
 * @interface CategoryLineItemProps - Props for the CategoryLineItem component
 *
 * @prop {string} title - The title of the line item
 * @prop {number} value - The dollar value of the line item
 * @prop {number} percentage - The percentage of the total that the line item value represents
 */
export interface CategoryLineItemProps {
  title: string;
  value: number;
  percentage: number;
  repeatingPeriod?: Omit<TimePeriod, "weekly">;
}

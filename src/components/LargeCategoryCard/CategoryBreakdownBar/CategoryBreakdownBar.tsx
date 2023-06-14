import { Fragment } from "react";
import type { MonetaryItem } from "../../../types/types";
import "./CategoryBreakdownBar.styles.css";

/**
 * @interface CategoryBreakdownBarProps - Props for the CategoryBreakdownBar component
 *
 * @prop {MonetaryItem[]} values - The values to display in the bar
 */
interface CategoryBreakdownBarProps {
  values: MonetaryItem[];
}

/**
 * @component CategoryBreakdownBar
 * @description A bar that displays a breakdown of a category's values.
 * Displays a bar that represents the values in a monetary category.
 * The bar is divided into sections that represent the percentage of the total that each value represents.
 * The name of each value is displayed in the section that represents it.
 * Hovering over a section displays the value and percentage of the total that the value represents.
 */
const CategoryBreakdownBar = ({ values }: CategoryBreakdownBarProps) => {
  // Sort the values from largest to smallest
  values = values.sort((a, b) => b.value - a.value);

  // Calculate the percentage each value takes up of the total
  const percentageValues = values.map((value) =>
    Math.floor((value.value / values.reduce((a, b) => a + b.value, 0)) * 100)
  );

  return (
    <div className="categorybreakdownbar-container">
      {values.map((value, index) => (
        <Fragment key={index}>
          <div
            className="categorybreakdownbar-value"
            style={{ width: `${percentageValues[index]}%` }}
          >
            {percentageValues[index] > 20 && value.name}
          </div>
          {index !== values.length - 1 && (
            <div className="categorybreakdownbar-divider" />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default CategoryBreakdownBar;

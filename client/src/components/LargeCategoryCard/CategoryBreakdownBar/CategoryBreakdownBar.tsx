import { MonetaryItem } from "../../../util/types/types";
import "./CategoryBreakdownBar.styles.css";
import { Fragment } from "react";

/**
 * @interface CategoryBreakdownBarProps - Props for the CategoryBreakdownBar component
 *
 * @prop {MonetaryItem[]} values - The values to display in the bar
 */
interface CategoryBreakdownBarProps {
  values: MonetaryItem[];
}

const CategoryBreakdownBar = ({ values }: CategoryBreakdownBarProps) => {
  // Sort the values from largest to smallest
  values = values.sort((a, b) => {
    return b.value - a.value;
  });

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

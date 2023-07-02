import type { CategoryLineItemProps } from "./CategoryLineItem.defintions";
import "./CategoryLineItem.styles.css";

/**
 * @component CategoryLineItem
 * @description A line item in the LargeCategoryCard component.
 * Displays the title, value, and percentage of the total that the value represents.
 * Also displays a bar that represents the percentage of the total that the value represents.
 */
const CategoryLineItem = ({
  title,
  value,
  percentage,
  repeatingPeriod,
}: CategoryLineItemProps) => (
  <div
    className="categorylineitem-container"
    data-testid="categorylineitem-testId"
  >
    <div className="categorylineitem-lefthalf">
      <div className="categorylineitem-title">
        {title}{" "}
        <span className="categorylineitem-repeatingperiod">
          {repeatingPeriod !== undefined && repeatingPeriod !== null
            ? " (" + repeatingPeriod + ")"
            : ""}{" "}
        </span>
      </div>
      <div className="categorylineitem-value">
        {value < 0 ? "-$" : "$"}
        {value.toString().replace("-", "")}
      </div>
    </div>
    <div className="categorylineitem-righthalf">
      <div
        className="categorylineitem-bar"
        style={{
          width: `${percentage > 0 ? percentage : 1}%`,
        }}
      />
      <div className="categorylineitem-percentage">
        {percentage > 0 ? percentage : "< 1"}%
      </div>
    </div>
  </div>
);

export default CategoryLineItem;

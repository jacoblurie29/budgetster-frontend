import "./CategoryLineItem.styles.css";
/**
 * @interface CategoryLineItemProps - Props for the CategoryLineItem component
 *
 * @prop {string} title - The title of the line item
 * @prop {number} value - The dollar value of the line item
 * @prop {number} percentage - The percentage of the total that the line item value represents
 */
interface CategoryLineItemProps {
  title: string;
  value: number;
  percentage: number;
}

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
}: CategoryLineItemProps) => (
  <div
    className="categorylineitem-container"
    data-testid="categorylineitem-testId"
  >
    <div className="categorylineitem-lefthalf">
      <div className="categorylineitem-title">{title}</div>
      <div className="categorylineitem-value">
        {value < 0 ? "-$" : "$"}
        {value.toString().replace("-", "")}
      </div>
    </div>
    <div className="categorylineitem-righthalf">
      <div
        className="categorylineitem-bar"
        style={{
          width: `${percentage}%`,
        }}
      />
      <div className="categorylineitem-percentage">{percentage}%</div>
    </div>
  </div>
);

export default CategoryLineItem;

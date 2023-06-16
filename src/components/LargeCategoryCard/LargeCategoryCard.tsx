import CategoryBreakdownBar from "./CategoryBreakdownBar/CategoryBreakdownBar";
import CategoryLineItem from "./CategoryLineItem/CategoryLineItem";
import { MonetaryItemCategory, TimePeriod } from "../../types/types";
import type { MonetaryItem } from "../../types/types";
import "./LargeCategoryCard.styles.css";

/**
 * @interface LargeCategoryCardProps - Props for the LargeCategoryCard component
 *
 * @prop {string} title - The title of the card
 * @prop {MonetaryItem[]} values - The values to display in the card
 * @prop {TimePeriod} timePeriod - The time period that the values are represented in
 */
interface LargeCategoryCardProps {
  title: string;
  values: MonetaryItem[];
  timePeriod: TimePeriod;
  category: MonetaryItemCategory;
}

/**
 * @component LargeCategoryCard
 * @description A card that displays a breakdown of a category's values.
 * Displays a bar and information that represents the values in a monetary category.
 * Top bar displays the percentage of the total that each value represents.
 * Line items in the card display the title, value, and percentage of the total that each value represents.
 */
const LargeCategoryCard = ({
  title,
  values,
  timePeriod,
  category,
}: LargeCategoryCardProps) => {
  const total = values.reduce((a, b) => a + b.value, 0);

  return (
    <div
      className="largecategorycard-container"
      data-testid="largecategorycard-testId"
    >
      <div className="largecategorycard-header">
        <div className="largecategorycard-title">{title}</div>
        <div className="largecategorycard-total">
          {(category !== MonetaryItemCategory.INCOME ? "-$" : "$") +
            total.toString().replace("-", "") +
            " " +
            (timePeriod === TimePeriod.MONTHLY ? "/ month" : "/ year")}
        </div>
      </div>
      <div className="largecategorycard-content">
        <CategoryBreakdownBar values={values} />
        {values.map((value, index) => (
          <CategoryLineItem
            key={index}
            title={value.name}
            value={value.value}
            percentage={Math.floor((value.value / total) * 100)}
          />
        ))}
      </div>
    </div>
  );
};

export default LargeCategoryCard;

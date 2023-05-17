import { MonetaryItem, TimePeriod } from "../../types/types";
import CategoryBreakdownBar from "../CategoryBreakdownBar.tsx/CategoryBreakdownBar";

interface LargeCategoryCardProps {
  title: string;
  values: MonetaryItem[];
  timePeriod: TimePeriod;
}

const LargeCategoryCard = ({
  title,
  values,
  timePeriod,
}: LargeCategoryCardProps) => {
  return (
    <div className="largecategorycard-container">
      <CategoryBreakdownBar values={values} />
    </div>
  );
};

export default LargeCategoryCard;

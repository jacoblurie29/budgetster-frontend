import { MONTHS_SHORT } from "../../../util/constants/constants";
import { TimePeriod } from "../../../util/types/types";
import "./TimePeriodCarousel.styles.css";

/**
 * @interface TimePeriodCarouselProps - Props for the TimePeriodCarousel component
 *
 * @prop {TimePeriod} timePeriod - The time period that the user has selected
 * @prop {number} month - The current month
 * @prop {number} year - The current year
 * @prop {(month: number) => void} setMonth - A function that sets the month
 * @prop {(year: number) => void} setYear - A function that sets the year
 */
interface TimePeriodCarouselProps {
  timePeriod: TimePeriod;
  month: number;
  year: number;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
}

/**
 * @component TimePeriodCarousel
 * @description A carousel for the time period.
 * Allows the user to select and change dates between monthly and yearly.
 * Displays a left and right arrow that the user can click to change the month or year.
 * Displays the current month and year.
 */
const TimePeriodCarousel = ({
  timePeriod,
  month,
  year,
  setMonth,
  setYear,
}: TimePeriodCarouselProps) => {
  // Handles the left click of the carousel (decrements the month or year)
  const handleLeftClick = () => {
    if (timePeriod === TimePeriod.MONTHLY) {
      if (month === 0) {
        setMonth(11);
        setYear(year - 1);
      } else {
        setMonth(month - 1);
      }
    } else {
      setYear(year - 1);
    }
  };

  // Handles the right click of the carousel (increments the month or year)
  const handleRightClick = () => {
    if (timePeriod === TimePeriod.MONTHLY) {
      if (month === 11) {
        setMonth(0);
        setYear(year + 1);
      } else {
        setMonth(month + 1);
      }
    } else {
      setYear(year + 1);
    }
  };

  return (
    <div className="timeperiodcarousel-container">
      <button onClick={handleLeftClick}>
        <i className="arrow left"></i>
      </button>
      <p>
        {timePeriod === TimePeriod.MONTHLY
          ? MONTHS_SHORT[month] + " " + year
          : year}
      </p>
      <button onClick={handleRightClick}>
        <i className="arrow right"></i>
      </button>
    </div>
  );
};

export default TimePeriodCarousel;

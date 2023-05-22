import { MONTHS_SHORT } from "../../../constants/constants";
import { TimePeriod } from "../../../types/types";
import "./TimePeriodCarousel.styles.css";

interface TimePeriodCarouselProps {
  timePeriod: TimePeriod;
  month: number;
  year: number;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
}

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

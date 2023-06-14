import TimePeriodCarousel from "./TimePeriodCarousel/TimePeriodCarousel";
import TimePeriodSelector from "./TimePeriodSelector/TimePeriodSelector";
import { TimePeriod } from "../../types/types";
import "./TimeControl.styles.css";
import { useState } from "react";

/**
 * @component TimeControl
 * @description The time control component.
 * Displays a carousel and selector for the time period.
 * The carousel allows the user to select a month or year.
 * The selector allows the user to select and change dates between monthly and yearly.
 */
const TimeControl = () => {
  // Time period state
  const [timePeriod, setTimePeriod] = useState(TimePeriod.MONTHLY);

  // Current month and year state
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());

  return (
    <div className="timecontrol-container">
      <TimePeriodCarousel
        timePeriod={timePeriod}
        month={month}
        year={year}
        setMonth={setMonth}
        setYear={setYear}
      />
      <TimePeriodSelector
        timePeriod={timePeriod}
        setTimePeriod={setTimePeriod}
      />
    </div>
  );
};

export default TimeControl;

import { TimePeriod } from "../../types/types";
import TimePeriodCarousel from "./TimePeriodCarousel/TimePeriodCarousel";
import TimePeriodSelector from "./TimePeriodSelector/TimePeriodSelector";
import "./TimeControl.styles.css";
import { useState } from "react";

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

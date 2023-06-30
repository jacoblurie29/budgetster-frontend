import TimePeriodCarousel from "./TimePeriodCarousel/TimePeriodCarousel";
import TimePeriodSelector from "./TimePeriodSelector/TimePeriodSelector";
import "./TimeControl.styles.css";
import { useAppDispatch, useAppSelector } from "../../state/configureStore";
import { setMonth, setRange, setYear } from "../../state/slices/timeSlice";
import type { TimePeriod } from "../../types/types";

/**
 * @component TimeControl
 * @description The time control component.
 * Displays a carousel and selector for the time period.
 * The carousel allows the user to select a month or year.
 * The selector allows the user to select and change dates between monthly and yearly.
 */
const TimeControl = () => {
  // Current month and year state
  const month = useAppSelector((state) => state.time.month);
  const year = useAppSelector((state) => state.time.year);
  const range = useAppSelector((state) => state.time.range);

  // Get the dispatch function from the redux store
  const dispatch = useAppDispatch();

  // Set month state
  const setCurrentMonth = (month: number) => {
    dispatch(setMonth(month));
  };

  // Set year state
  const setCurrentYear = (year: number) => {
    dispatch(setYear(year));
  };

  // Set range state
  const setCurrentRange = (range: Omit<TimePeriod, "weekly">) => {
    dispatch(setRange(range));
  };

  return (
    <div className="timecontrol-container">
      <TimePeriodCarousel
        timePeriod={range}
        month={month}
        year={year}
        setMonth={setCurrentMonth}
        setYear={setCurrentYear}
      />
      <TimePeriodSelector timePeriod={range} setTimePeriod={setCurrentRange} />
    </div>
  );
};

export default TimeControl;

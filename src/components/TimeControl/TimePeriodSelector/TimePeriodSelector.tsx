import { TimePeriod } from "../../../types/types";
import "./TimePeriodSelector.styles.css";

/**
 * @interface TimePeriodSelectorProps - Props for the TimePeriodSelector component
 *
 * @prop {TimePeriod} timePeriod - The time period that the user has selected
 * @prop {(timePeriod: TimePeriod) => void} setTimePeriod - A function that sets the time period
 */
interface TimePeriodSelectorProps {
  timePeriod: Omit<TimePeriod, "weekly">;
  setTimePeriod: (_: Omit<TimePeriod, "weekly">) => void;
}

/**
 * @component TimePeriodSelector
 * @description A selector for the time period.
 * Allows the user to select and change dates between monthly and yearly.
 * Displays a checkbox that the user can click to change the time period.
 * The checkbox is styled to look like a toggle switch.
 */
const TimePeriodSelector = ({
  timePeriod,
  setTimePeriod,
}: TimePeriodSelectorProps) => (
  <div className="timeperiodselector-container">
    <div className="button r" id="button-4">
      <input
        type="checkbox"
        className="checkbox"
        defaultChecked={timePeriod === TimePeriod.YEARLY}
        onClick={() => {
          if (timePeriod === TimePeriod.MONTHLY) {
            setTimePeriod(TimePeriod.YEARLY);
          } else {
            setTimePeriod(TimePeriod.MONTHLY);
          }
        }}
      />
      <div className="knobs" />
      <div className="layer" />
    </div>
  </div>
);

export default TimePeriodSelector;

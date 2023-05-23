import { TimePeriod } from "../../../util/types/types";
import "./TimePeriodSelector.styles.css";

interface TimePeriodSelectorProps {
  timePeriod: TimePeriod;
  setTimePeriod: (timePeriod: TimePeriod) => void;
}

const TimePeriodSelector = ({
  timePeriod,
  setTimePeriod,
}: TimePeriodSelectorProps) => {
  return (
    <div className="timeperiodselector-container">
      <div className="button r" id="button-4">
        <input
          type="checkbox"
          className="checkbox"
          onClick={() => {
            if (timePeriod === TimePeriod.MONTHLY) {
              setTimePeriod(TimePeriod.YEARLY);
            } else {
              setTimePeriod(TimePeriod.MONTHLY);
            }
          }}
        />
        <div className="knobs"></div>
        <div className="layer"></div>
      </div>
    </div>
  );
};

export default TimePeriodSelector;

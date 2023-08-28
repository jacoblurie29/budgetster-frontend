import type { InitialsCircleProps } from "./InitialsCircle.definitions";
import "./InitialsCircle.styles.css";

const InitialsCircle = ({
  initials,
  variant = "small",
  backgroundColor = "#AAAAAA",
}: InitialsCircleProps) => (
  <div
    style={{
      backgroundColor: backgroundColor,
    }}
    className={`initials-circle-${variant}`}
  >
    {initials.substring(0, 2)}
  </div>
);

export default InitialsCircle;

import "./LargeCountCard.styles.css";

/**
 * @interface LargeCountCardProps
 *
 * @prop {string} title - The title of the card
 * @prop {number} value - The value to display in the card
 * @prop {string} subtitle - The optional subtitle of the card
 */
interface LargeCountCardProps {
  title: string;
  value: number;
  subtitle?: string;
}

/**
 * @component LargeCountCard
 * @description A large card that displays a count of a monetary value.
 * Displays a title, value, and optional subtitle.
 */
const LargeCountCard = ({ title, value, subtitle }: LargeCountCardProps) => {
  return (
    <div className="largecountcard-container">
      <div className="largecountcard-title">{title}</div>
      <div className="largecountcard-value">
        {(value < 0 ? "-$" : "$") + value.toString().replace("-", "")}
      </div>
      {subtitle && <div className="largecountcard-subtitle">{subtitle}</div>}
    </div>
  );
};

export default LargeCountCard;

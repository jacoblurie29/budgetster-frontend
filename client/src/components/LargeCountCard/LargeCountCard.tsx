import "./LargeCountCard.styles.css";

interface LargeCountCardProps {
  title: string;
  value: number;
  subtitle?: string;
}

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

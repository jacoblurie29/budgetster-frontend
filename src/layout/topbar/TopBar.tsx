import TimeControl from "../../components/TimeControl/TimeControl";
import { formatTitle } from "../../util/helpers/string.util";
import "./TopBar.styles.css";

interface TopBarProps {
  title: string;
  hasTimeControl?: boolean;
}

const TopBar = ({ title, hasTimeControl = false }: TopBarProps) => (
  <div className="app-topbar-container">
    <h1 className="app-topbar-title">{formatTitle(title)}</h1>
    {hasTimeControl && <TimeControl />}
  </div>
);

export default TopBar;

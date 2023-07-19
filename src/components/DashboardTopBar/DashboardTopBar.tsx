import TimeControl from "../TimeControl/TimeControl";
import { formatTitle } from "../../util/helpers/string.util";
import "./DashboardTopBar.styles.css";

interface TopBarProps {
  title: string;
  hasTimeControl?: boolean;
}

const DashboardTopBar = ({ title, hasTimeControl = false }: TopBarProps) => (
  <div className="app-topbar-container">
    <h1 className="app-topbar-title">{formatTitle(title)}</h1>
    {hasTimeControl && <TimeControl />}
  </div>
);

export default DashboardTopBar;

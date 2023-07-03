import PropagateLoader from "react-spinners/PropagateLoader";
import type { FullPageLoadingIndicatorProps } from "./FullPageLoadingIndicator.definitions";
import "./FullPageLoadingIndicator.styles.css";

/**
 * @component FullPageLoadingIndicator
 * @description A full page loading indicator that displays a progress bar and a title.
 * @param {string} title - The title to display below the progress bar (optional - defaults to "Loading")
 */
const FullPageLoadingIndicator = ({ title }: FullPageLoadingIndicatorProps) => (
  <div className="full-page-loading-indicator">
    <div className="full-page-loading-indicator-progress">
      <PropagateLoader color={"#76e7aa"} />
    </div>
    {title && <div className="full-page-loading-indicator-title">{title}</div>}
  </div>
);

export default FullPageLoadingIndicator;

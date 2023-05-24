import { useState } from "react";
import "./Sidebar.styles.css";

const Sidebar = () => {
  const [sideBar, setSideBar] = useState<boolean>(false);

  return (
    <div
      className={
        sideBar ? "sidebar-container sidebar-active" : "sidebar-container"
      }
    >
      <div className="sidebar-header">
        <button onClick={() => setSideBar(!sideBar)}>
          <i className={sideBar ? "arrow left" : "arrow right"}></i>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

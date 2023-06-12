import { useState } from "react";
import budgetsterIcon from "../../assets/BudgetsterIcon.png";
import "./Sidebar.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faHouse,
  faMoneyBillTrendUp,
  faPiggyBank,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [sideBar, setSideBar] = useState<boolean>(false);
  const [activeRoute, setActiveRoute] = useState<string>("Dashboard");

  const sideBarTitles = [
    "Dashboard",
    "Expenses",
    "Income",
    "Investments",
    "Settings",
  ];

  const sideBarIcons = [
    faHouse,
    faWallet,
    faMoneyBillTrendUp,
    faPiggyBank,
    faCog,
  ];

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
      <div
        className={`sidebar-open ${
          sideBar ? "sidebar-open-visible" : "sidebar-open-hidden"
        }`}
      >
        <div className="sidebar-logo-container">
          <img
            className="sidebar-logo-image"
            src={budgetsterIcon}
            alt="budgster icon"
          />
        </div>
        <div className={"sidebar-routes"}>
          {sideBarTitles.map((title, index) => (
            <div
              className={
                activeRoute === title
                  ? "sidebar-route-active"
                  : "sidebar-route-inactive"
              }
              key={index}
            >
              {title}
            </div>
          ))}
        </div>
      </div>
      <div
        className={`sidebar-closed ${
          sideBar ? "sidebar-closed-hidden" : "sidebar-closed-visible"
        }`}
      >
        {sideBarTitles.map((title, index) => (
          <div className="sidebar-closed-route" key={index}>
            <FontAwesomeIcon
              className={`sidebar-closed-icon ${
                activeRoute === title
                  ? "sidebar-closed-icon-active"
                  : "sidebar-closed-icon-inactive"
              }`}
              icon={sideBarIcons[index]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

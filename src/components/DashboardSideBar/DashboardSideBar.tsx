import budgetsterIcon from "../../assets/BudgetsterIcon.png";
import { useState } from "react";
import "./DashboardSideBar.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faHouse,
  faMoneyBillTrendUp,
  faPiggyBank,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const DashboardSideBar = () => {
  const [sideBar, setSideBar] = useState<boolean>(false);
  const [activeRoute, setActiveRoute] = useState<string>("Dashboard");

  const navigate = useNavigate();

  // Titles for the sidebar
  const sideBarTitles = [
    "Dashboard",
    "Expenses",
    "Income",
    "Investments",
    "Settings",
  ];

  // Icon components for the sidebar
  const sideBarIcons = [
    faHouse,
    faWallet,
    faMoneyBillTrendUp,
    faPiggyBank,
    faCog,
  ];

  // Sets the active route when a route is clicked
  const handleRouteChange = (route: string) => {
    setActiveRoute(route);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div
      className={
        sideBar ? "sidebar-container sidebar-active" : "sidebar-container"
      }
    >
      <div className="sidebar-header">
        <button onClick={() => setSideBar(!sideBar)}>
          <i className={sideBar ? "arrow left" : "arrow right"} />
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
          <div>
            {sideBarTitles.map((title, index) => (
              <Link
                to={"/" + title.toLowerCase()}
                className={"sidebar-route-link"}
                key={index}
              >
                <div
                  className={
                    "sidebar-route " +
                    (activeRoute === title
                      ? "sidebar-route-active"
                      : "sidebar-route-inactive")
                  }
                  key={index}
                  onClick={() => {
                    handleRouteChange(title);
                    setSideBar(false);
                  }}
                >
                  {title}
                </div>
              </Link>
            ))}
          </div>
          <div className="sidebar-back-to-home" onClick={handleBackToHome}>
            <i className={"arrow left"} />
            Back to home
          </div>
        </div>
      </div>
      <div
        className={`sidebar-closed ${
          sideBar ? "sidebar-closed-hidden" : "sidebar-closed-visible"
        }`}
      >
        {sideBarTitles.map((title, index) => (
          <div
            className="sidebar-closed-route"
            key={index}
            onClick={() => {
              handleRouteChange(title);
            }}
          >
            <Link to={"/" + title.toLowerCase()} key={index}>
              <FontAwesomeIcon
                className={`sidebar-closed-icon ${
                  activeRoute === title
                    ? "sidebar-closed-icon-active"
                    : "sidebar-closed-icon-inactive"
                }`}
                icon={sideBarIcons[index]}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSideBar;

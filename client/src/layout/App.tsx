import LargeCountCard from "../components/LargeCountCard/LargeCountCard";
import "./App.css";
import BudgetsterLogo from "../assets/BudgetsterLogo.png";
import LargeCategoryCard from "../components/LargeCategoryCard/LargeCategoryCard";
import { TimePeriod } from "../util/types/types";
import {
  testExpensesData,
  testIncomesData,
  testSavingsInvestmentsData,
} from "../util/testing/testData";
import TimeControl from "../components/TimeControl/TimeControl";
import { useState } from "react";

const App = () => {
  const [sideBar, setSideBar] = useState<boolean>(false);

  return (
    <div className="app-main-container">
      <div
        className={
          sideBar
            ? "app-main-sidebar app-main-sidebar-active"
            : "app-main-sidebar"
        }
      >
        <div className="app-main-sidebar-header">
          <button onClick={() => setSideBar(!sideBar)}>
            <i className={sideBar ? "arrow left" : "arrow right"}></i>
          </button>
        </div>
      </div>
      <div className="app-main-content">
        <div className="app-main-topbar">
          <img
            className="app-main-logo"
            src={BudgetsterLogo}
            alt="Budgetster Logo"
          />
          <TimeControl />
        </div>
        <div className="app-largecountcards-container">
          <LargeCountCard title="Monthly Budget" value={451} />
          <LargeCountCard
            title="Current Outlook"
            value={-131}
            subtitle="per month"
          />
        </div>
        <LargeCategoryCard
          title="Expenses"
          values={testExpensesData}
          timePeriod={TimePeriod.MONTHLY}
        />
        <LargeCategoryCard
          title="Income"
          values={testIncomesData}
          timePeriod={TimePeriod.MONTHLY}
        />
        <LargeCategoryCard
          title="Savings/Investments"
          values={testSavingsInvestmentsData}
          timePeriod={TimePeriod.MONTHLY}
        />
      </div>
    </div>
  );
};

export default App;

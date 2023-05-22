import LargeCountCard from "../components/LargeCountCard/LargeCountCard";
import "./App.css";
import BudgetsterLogo from "../assets/BudgetsterLogo.png";
import LargeCategoryCard from "../components/LargeCategoryCard/LargeCategoryCard";
import { TimePeriod } from "../types/types";
import { testExpensesData } from "../testData/testData";
import TimeControl from "../components/TimeControl/TimeControl";

const App = () => {
  return (
    <div className="app-main-container">
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
    </div>
  );
};

export default App;

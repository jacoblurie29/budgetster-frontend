import LargeCountCard from "../components/LargeCountCard/LargeCountCard";
import "./App.css";
import BudgetsterLogo from "../assets/BudgetsterLogo.png";
import LargeCategoryCard from "../components/LargeCategoryCard/LargeCategoryCard";
import { TimePeriod } from "../types/types";
import { testExpensesData } from "../testData/testData";

const App = () => {
  return (
    <div className="app-main-container">
      <img
        className="app-main-logo"
        src={BudgetsterLogo}
        alt="Budgetster Logo"
      />
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

import LargeCategoryCard from "../../components/LargeCategoryCard/LargeCategoryCard";
import LargeCountCard from "../../components/LargeCountCard/LargeCountCard";
import TimeControl from "../../components/TimeControl/TimeControl";
import {
  testExpensesData,
  testIncomesData,
  testSavingsInvestmentsData,
} from "../../util/testing/testData";
import { TimePeriod, MonetaryItemCategory } from "../../types/types";
import BudgetsterLogo from "../../assets/BudgetsterLogo.png";
import "./Dashboard.styles.css";

const Dashboard = () => (
  <div className="dashboard-container">
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
      category={MonetaryItemCategory.EXPENSE}
    />
    <LargeCategoryCard
      title="Income"
      values={testIncomesData}
      timePeriod={TimePeriod.MONTHLY}
      category={MonetaryItemCategory.INCOME}
    />
    <LargeCategoryCard
      title="Investments"
      values={testSavingsInvestmentsData}
      timePeriod={TimePeriod.MONTHLY}
      category={MonetaryItemCategory.INVESTMENT}
    />
  </div>
);

export default Dashboard;

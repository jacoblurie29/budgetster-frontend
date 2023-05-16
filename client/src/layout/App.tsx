import LargeCountCard from "../components/LargeCountCard/LargeCountCard";
import "./App.css";
import BudgetsterLogo from "../assets/BudgetsterLogo.png";

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
    </div>
  );
};

export default App;

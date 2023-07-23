import budgetsterCashBag from "../../assets/BudgsterCashBag.png";
import LoginCard from "../../components/LoginCard/LoginCard";
import RegisterCard from "../../components/RegisterCard/RegisterCard";
import { AuthType } from "../../types/types";
import { useLocation } from "react-router-dom";
import "./Accounts.styles.css";
import { useState } from "react";

const Accounts = () => {
  const { authOptionFromNavigation } = useLocation().state || "";
  const [isLogin, setIsLogin] = useState(
    authOptionFromNavigation || AuthType.LOGIN
  );

  const handleModeChange = (newValue: AuthType) => {
    setIsLogin(newValue);
  };

  console.log(authOptionFromNavigation);

  return (
    <div className="accounts-container">
      <div className="accounts-left-container">
        <div className="accounts-text-container">
          <img className="accounts-cashbag" src={budgetsterCashBag} />
          <h1>Your finances. Simplified.</h1>
          <h2>
            No cents. No complicated settings. Just what goes in and what goes
            out.
          </h2>
        </div>
      </div>
      <div className="accounts-right-container">
        {isLogin === AuthType.LOGIN ? (
          <LoginCard handleModeChange={handleModeChange} />
        ) : (
          <RegisterCard handleModeChange={handleModeChange} />
        )}
      </div>
    </div>
  );
};

export default Accounts;

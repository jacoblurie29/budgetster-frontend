import budgetsterCashBag from "../../assets/BudgsterCashBag.png";
import budgetsterLogo from "../../assets/BudgetsterLogo.png";
import FormInput from "../../components/FormInput/FormInput";
import { useState } from "react";

import "./Accounts.styles.css";

const Accounts = () => {
  const [isLogin, setIsLogin] = useState(true);

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
        <div className="accounts-action-container">
          <img className="accounts-action-logo" src={budgetsterLogo} />
          <h1>Let's get started.</h1>
          <FormInput
            label="Email"
            placeholder="example@budgetster.com"
            type="tmail"
          />
          <div className="accounts-action-names-container">
            <FormInput label="First name" placeholder="John" type="text" />
            <FormInput label="Last name" placeholder="Doe" type="text" />
          </div>
          <FormInput label="Password" placeholder="•••••••••" type="password" />
          <FormInput
            label="Confirm Password"
            placeholder="•••••••••"
            type="password"
          />
        </div>
      </div>
    </div>
  );
};

export default Accounts;

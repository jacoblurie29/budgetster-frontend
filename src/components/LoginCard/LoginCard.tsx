import FormInput from "../FormInput/FormInput";
import budgetsterLogo from "../../assets/BudgetsterLogo.png";
import "./LoginCard.styles.css";
import { AuthType } from "../../types/types";
import type { LoginCardProps } from "./LoginCard.definitions";

const LoginCard = ({ handleModeChange }: LoginCardProps) => {
  const handleLogin = () => {
    console.log("💻 [AUTH]: Handling login...");
  };

  return (
    <div className="login-action-container">
      <img className="login-action-logo" src={budgetsterLogo} />
      <h1>Welcome back.</h1>
      <FormInput
        name="email"
        label="Email"
        placeholder="example@budgetster.com"
        type="tmail"
      />
      <FormInput
        name="password"
        label="Password"
        placeholder="•••••••••"
        type="password"
      />
      <div className="checkbox-wrapper-42">
        <input id="cbx-42" type="checkbox" />
        <label className="cbx" htmlFor="cbx-42" />
        <label className="lbl" htmlFor="cbx-42">
          Remember me
        </label>
      </div>
      <button className="login-action-button" onClick={handleLogin}>
        Log in
      </button>
      <div className="login-action-switch-text-container">
        <p className="login-switch-text">{"Don't have an account?"}</p>
        <a
          className="login-switch-link"
          onClick={() => handleModeChange(AuthType.SIGNUP)}
        >
          Sign up here!
        </a>
      </div>
    </div>
  );
};

export default LoginCard;

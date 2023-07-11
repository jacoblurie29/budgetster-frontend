import FormInput from "../FormInput/FormInput";
import budgetsterLogo from "../../assets/BudgetsterLogo.png";
import "./RegisterCard.styles.css";
import { AuthType } from "../../types/types";
import type { RegisterCardProps } from "./RegisterCard.definitions";

const RegisterCard = ({ handleModeChange }: RegisterCardProps) => {
  const handleRegister = () => {
    console.log("💻 [AUTH]: Handling register...");
  };

  return (
    <div className="register-action-container">
      <img className="register-action-logo" src={budgetsterLogo} />
      <h1>Let's get started.</h1>
      <FormInput
        name="email"
        label="Email"
        placeholder="example@budgetster.com"
        type="tmail"
      />
      <div className="register-action-names-container">
        <FormInput
          name="firstName"
          label="First name"
          placeholder="John"
          type="text"
        />
        <FormInput
          name="lastName"
          label="Last name"
          placeholder="Doe"
          type="text"
        />
      </div>
      <FormInput
        name="password"
        label="Password"
        placeholder="•••••••••"
        type="password"
      />
      <FormInput
        name="confirmPassword"
        label="Confirm Password"
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
      <button className="register-action-button" onClick={handleRegister}>
        Sign up
      </button>
      <div className="register-action-switch-text-container">
        <p className="register-switch-text">Already have an account?</p>
        <a
          className="register-switch-link"
          onClick={() => handleModeChange(AuthType.LOGIN)}
        >
          Sign in here!
        </a>
      </div>
    </div>
  );
};

export default RegisterCard;

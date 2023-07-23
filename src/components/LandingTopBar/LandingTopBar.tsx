import budgetsterLogoTransparent from "../../assets/BudgetsterLogoTransparent.png";
import { AuthType } from "../../types/types";
import { Link } from "react-router-dom";
import "./LandingTopBar.styles.css";

const LandingTopBar = () => {
  console.log("LandingTopBar");
  return (
    <div className="landing-top-bar">
      <img
        src={budgetsterLogoTransparent}
        className="landing-top-bar-logo"
        alt="logo"
      />
      <div className="landing-top-bar-menu">
        <button className="landing-top-bar-menu-item">home</button>
        <button className="landing-top-bar-menu-item">about</button>
        <button className="landing-top-bar-menu-item">contact</button>
        <Link
          to="/accounts"
          state={{ authOptionFromNavigation: AuthType.LOGIN }}
        >
          <button className="landing-top-bar-menu-login-button">Log In</button>
        </Link>
        <Link
          to="/accounts"
          state={{ authOptionFromNavigation: AuthType.SIGNUP }}
        >
          <button className="landing-top-bar-menu-signup-button">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingTopBar;

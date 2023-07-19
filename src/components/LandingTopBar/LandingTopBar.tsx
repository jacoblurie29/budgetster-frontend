import budgetsterLogoTransparent from "../../assets/BudgetsterLogoTransparent.png";
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
        <button className="landing-top-bar-menu-login-button">Log In</button>
        <button className="landing-top-bar-menu-signup-button">Sign Up</button>
      </div>
    </div>
  );
};

export default LandingTopBar;

import { Link } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import type { AlreadyLoggedInButtonProps } from "./AlreadyLoggedInButton.definitions";

import "./AlreadyLoggedInButton.styles.css";

const AlreadyLoggedInButton = ({
  firstName,
  lastName,
  loading,
}: AlreadyLoggedInButtonProps) => (
  <Link to="/dashboard" className="landing-top-bar-link">
    <button className="landing-top-bar-menu-already-login-button">
      {loading ? (
        <BarLoader
          className="landing-top-bar-loader"
          color={"#76e7aa"}
          width={140}
        />
      ) : (
        <>
          <div className="landing-top-bar-menu-already-login-left">
            {firstName[0].toLocaleUpperCase()}
            {lastName[0].toLocaleUpperCase()}
          </div>
          <div className="landing-top-bar-menu-already-login-right">
            <div className="landing-top-bar-menu-already-login-button-welcome">
              Welcome back
            </div>
            <div className="landing-top-bar-menu-already-login-button-dashboard">
              Go to dashboard&nbsp;&rarr;
            </div>
          </div>
        </>
      )}
    </button>
  </Link>
);

export default AlreadyLoggedInButton;

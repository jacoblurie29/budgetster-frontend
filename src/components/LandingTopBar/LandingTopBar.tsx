import AlreadyLoggedInButton from "./AlreadyLoggedInButton/AlreadyLoggedInButton";
import budgetsterLogoTransparent from "../../assets/BudgetsterLogoTransparent.png";
import { RefreshTokenQuery } from "../../graphql/Auth.gql";
import { getCookie, setCookie } from "../../util/api/request.util";
import { AuthType } from "../../types/types";
import { Link } from "react-router-dom";
import "./LandingTopBar.styles.css";
import { useEffect } from "react";

import { useQuery } from "@apollo/client";

const LandingTopBar = () => {
  // Get the refresh token from the cookie
  const cookieValue = getCookie("refreshToken");

  const { data, error, loading } = useQuery(RefreshTokenQuery, {
    variables: {
      refreshTokenInput: {
        refreshToken: cookieValue,
      },
    },
  });

  useEffect(() => {
    if (!error && !loading) {
      // set the auth token in local storage
      localStorage.setItem("authToken", data.refreshToken.authToken);

      // set the refresh token in the cookies
      setCookie("refreshToken", data.refreshToken.refreshToken, 5);
    }
  }, [data, loading, error]);

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

        {data !== undefined || loading ? (
          <AlreadyLoggedInButton
            firstName={data?.refreshToken?.firstName || ""}
            lastName={data?.refreshToken?.lastName || ""}
            loading={loading}
          />
        ) : (
          <>
            <Link
              to="/accounts"
              state={{ authOptionFromNavigation: AuthType.LOGIN }}
            >
              <button className="landing-top-bar-menu-login-button">
                Log In
              </button>
            </Link>
            <Link
              to="/accounts"
              state={{ authOptionFromNavigation: AuthType.SIGNUP }}
            >
              <button className="landing-top-bar-menu-signup-button">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default LandingTopBar;

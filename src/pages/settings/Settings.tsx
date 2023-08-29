import { GetUserQuery } from "../../graphql/Auth.gql";
import DashboardTopBar from "../../components/DashboardTopBar/DashboardTopBar";
import FullPageLoadingIndicator from "../../components/FullPageLoadingIndicator/FullPageLoadingIndicator";
import InitialsCircle from "../../components/InitialsCircle/InitialsCircle";
import { deleteCookie } from "../../util/api/request.util";
import { getInitials } from "../../util/helpers/string.util";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import "./Settings.styles.css";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const {
    loading: userLoading,
    data: userData,
    refetch: userRefetch,
    error: userError,
  } = useQuery(GetUserQuery, {
    // fetchPolicy: "cache-and-network",
  });

  // Logout the user and redirect to login page, remove tokens
  const handleLogout = () => {
    deleteCookie("refreshToken");
    localStorage.removeItem("authToken");

    navigate("/");
  };

  // Refetch monetary items on mount
  useEffect(() => {
    try {
      userRefetch();
      console.log("✅ [API]: ", userData);
    } catch (error) {
      console.log("❌ [API]: ", userError);
    }
  }, []);

  return (
    <div className="settings-container">
      <DashboardTopBar title={"Settings"} />
      {userLoading || userError ? (
        <FullPageLoadingIndicator />
      ) : (
        <div className="settings-container-no-header">
          <div className="settings-user-block">
            <div className="settings-user-block-left">
              <InitialsCircle
                initials={getInitials(userData.getUser)}
                variant={"large"}
              />
            </div>
            <div className="settings-user-block-right">
              <div className="settings-user-name settings-person-line">
                {userData.getUser.firstName + " " + userData.getUser.lastName}
              </div>
              <div className="settings-user-email settings-person-line">
                {userData.getUser.email}
              </div>
              <div className="settings-user-since settings-person-line">
                {"Member since 12/2022"}
              </div>
              <div className="settings-user-logout" onClick={handleLogout}>
                {"Logout"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;

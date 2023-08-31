import { SettingsBudgetInputName } from "./Settings.definitions";
import { GetUserQuery } from "../../graphql/Auth.gql";
import DashboardTopBar from "../../components/DashboardTopBar/DashboardTopBar";
import FullPageLoadingIndicator from "../../components/FullPageLoadingIndicator/FullPageLoadingIndicator";
import InitialsCircle from "../../components/InitialsCircle/InitialsCircle";
import { deleteCookie } from "../../util/api/request.util";
import { getInitials } from "../../util/helpers/string.util";
import { settingsBudgetSchema } from "../../util/resolvers/settings.resolver";
import FormInput from "../../components/FormInput/FormInput";
import { UpdateUserBudgetMutation } from "../../graphql/User.gql";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import "./Settings.styles.css";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Alert, Snackbar } from "@mui/material";
import type { AlertProps } from "@mui/material";
import type { Resolver } from "react-hook-form";
import type { SettingsBudgetInput } from "./Settings.definitions";

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

  const [updateUserBudget] = useMutation(UpdateUserBudgetMutation);

  // Snackbar state and handler
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<SettingsBudgetInput>({
    defaultValues: {
      //TODO: need to get this value from redux
      [SettingsBudgetInputName.BUDGET]: 0,
    },
    resolver: yupResolver(
      settingsBudgetSchema
    ) as Resolver<SettingsBudgetInput>,
    mode: "onSubmit",
  });

  // Logout the user and redirect to login page, remove tokens
  const handleLogout = () => {
    deleteCookie("refreshToken");
    localStorage.removeItem("authToken");

    navigate("/");
  };

  const handleUpdateBudget = async (data: SettingsBudgetInput) => {
    if (!data.budget || data.budget === userData.getUser.budget) return;

    console.log("🚀 [API]: ", data.budget);

    const { errors } = await updateUserBudget({
      variables: {
        budget: data.budget,
      },
    });

    if (errors) {
      console.log("❌ [API]: ", errors);
      setSnackbar({
        children: "Failed to update user budget!",
        severity: "error",
      });
      return;
    }

    setSnackbar({
      children: "Successfully updated user budget!",
      severity: "success",
    });
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
          <div className="setting-options-block">
            <form
              className="budget-form"
              onSubmit={handleSubmit(handleUpdateBudget)}
            >
              <div className="settings-budget-block">
                <FormInput
                  name={SettingsBudgetInputName.BUDGET}
                  type={"number"}
                  label={"Change budget"}
                  placeholder={"Enter your budget"}
                  defaultValue={userData.getUser.budget}
                  control={control}
                  error={errors.budget?.message}
                />
                <button className="settings-save-button" type="submit">
                  {"Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
};

export default Settings;

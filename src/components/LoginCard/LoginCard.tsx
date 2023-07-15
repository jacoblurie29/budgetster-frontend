import { LoginInputName } from "./LoginCard.definitions";
import FormInput from "../FormInput/FormInput";
import budgetsterLogo from "../../assets/BudgetsterLogo.png";
import "./LoginCard.styles.css";
import { AuthType } from "../../types/types";
import FormCheckbox from "../FormCheckbox/FormCheckbox";
import { loginSchema } from "../../util/resolvers/auth.resolver";
import { LoginUserMutation } from "../../graphql/Auth.gql";
import { setCookie } from "../../util/api/request.util";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import type { LoginCardProps, LoginInput } from "./LoginCard.definitions";
import type { SubmitHandler, Resolver } from "react-hook-form";

const LoginCard = ({ handleModeChange }: LoginCardProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    defaultValues: {
      [LoginInputName.EMAIL]: "",
      [LoginInputName.PASSWORD]: "",
      [LoginInputName.REMEMBER_ME]: false,
    },
    resolver: yupResolver(loginSchema) as Resolver<LoginInput>,
    mode: "onSubmit",
  });
  const [loginUser] = useMutation(LoginUserMutation);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    const { data: loginResponseData, errors } = await loginUser({
      variables: {
        loginInput: {
          email: data.email,
          password: data.password,
        },
      },
    });

    if (!errors) {
      // set the auth token in local storage
      localStorage.setItem("authToken", loginResponseData.loginUser.authToken);

      // set the refresh token in the cookies
      setCookie("refreshToken", loginResponseData.loginUser.refreshToken, 5);

      // redirect to the dashboard
      navigate("/dashboard");
    }
  };

  return (
    <div className="login-action-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <img className="login-action-logo" src={budgetsterLogo} />
        <h1>Welcome back.</h1>
        <FormInput
          name={LoginInputName.EMAIL}
          control={control}
          label="Email"
          placeholder="example@budgetster.com"
          type="text"
          error={errors[LoginInputName.EMAIL]?.message}
        />
        <FormInput
          name={LoginInputName.PASSWORD}
          control={control}
          label="Password"
          placeholder="•••••••••"
          type="password"
          error={errors[LoginInputName.PASSWORD]?.message}
        />
        <FormCheckbox
          name={LoginInputName.REMEMBER_ME}
          label="Remember me"
          defaultChecked={false}
          control={control}
        />
        <button className="login-action-button" type="submit">
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
      </form>
    </div>
  );
};

export default LoginCard;

import { RegisterInputName } from "./RegisterCard.definitions";
import FormInput from "../FormInput/FormInput";
import budgetsterLogo from "../../assets/BudgetsterLogo.png";
import "./RegisterCard.styles.css";
import { AuthType } from "../../types/types";
import FormCheckbox from "../FormCheckbox/FormCheckbox";
import { registerSchema } from "../../util/resolvers/auth.resolver";
import { RegisterUserMutation } from "../../graphql/Auth.gql";
import { setCookie } from "../../util/api/request.util";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import type { SubmitHandler, Resolver } from "react-hook-form";
import type {
  RegisterCardProps,
  RegisterInput,
} from "./RegisterCard.definitions";

const RegisterCard = ({ handleModeChange }: RegisterCardProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterInput>({
    defaultValues: {
      [RegisterInputName.EMAIL]: "",
      [RegisterInputName.FIRST_NAME]: "",
      [RegisterInputName.LAST_NAME]: "",
      [RegisterInputName.PASSWORD]: "",
      [RegisterInputName.CONFIRM_PASSWORD]: "",
      [RegisterInputName.REMEMBER_ME]: false,
    },
    resolver: yupResolver(registerSchema) as Resolver<RegisterInput>,
    mode: "onSubmit",
  });

  const [registerUser] = useMutation(RegisterUserMutation);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    const { data: registerResponseData, errors } = await registerUser({
      variables: {
        registerInput: {
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
        },
      },
    });

    console.log(registerResponseData);

    if (!errors) {
      // set the auth token in local storage
      localStorage.setItem(
        "authToken",
        registerResponseData.registerUser.authToken
      );

      // set the refresh token in the cookies
      setCookie(
        "refreshToken",
        registerResponseData.registerUser.refreshToken,
        5
      );

      // redirect to the dashboard
      navigate("/dashboard");
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="register-action-container">
      <button className="register-go-back" onClick={handleGoBack}>
        &larr;&nbsp;
      </button>
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <img className="register-action-logo" src={budgetsterLogo} />
        <h1>{"Let's get started."}</h1>
        <FormInput
          name={RegisterInputName.EMAIL}
          control={control}
          label="Email"
          placeholder="example@budgetster.com"
          type="email"
          error={errors[RegisterInputName.EMAIL]?.message}
        />
        <div className="register-action-names-container">
          <FormInput
            name={RegisterInputName.FIRST_NAME}
            control={control}
            label="First name"
            placeholder="John"
            type="text"
            error={errors[RegisterInputName.FIRST_NAME]?.message}
          />
          <FormInput
            name={RegisterInputName.LAST_NAME}
            control={control}
            label="Last name"
            placeholder="Doe"
            type="text"
            error={errors[RegisterInputName.LAST_NAME]?.message}
          />
        </div>

        <FormInput
          name={RegisterInputName.PASSWORD}
          control={control}
          label="Password"
          placeholder="•••••••••"
          type="password"
          optText="8+ characters, number, uppercase, lowercase, and special character"
          error={errors[RegisterInputName.PASSWORD]?.message}
        />
        <FormInput
          name={RegisterInputName.CONFIRM_PASSWORD}
          control={control}
          label="Confirm Password"
          placeholder="•••••••••"
          type="password"
          error={errors[RegisterInputName.CONFIRM_PASSWORD]?.message}
        />

        <FormCheckbox
          name={RegisterInputName.REMEMBER_ME}
          label="Remember me"
          defaultChecked={false}
          control={control}
        />

        <button className="register-action-button" type="submit">
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
      </form>
    </div>
  );
};

export default RegisterCard;

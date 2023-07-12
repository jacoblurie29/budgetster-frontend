import { RegisterInputName } from "./RegisterCard.definitions";
import FormInput from "../FormInput/FormInput";
import budgetsterLogo from "../../assets/BudgetsterLogo.png";
import "./RegisterCard.styles.css";
import { AuthType } from "../../types/types";
import FormCheckbox from "../FormCheckbox/FormCheckbox";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type {
  RegisterCardProps,
  RegisterInput,
} from "./RegisterCard.definitions";

const RegisterCard = ({ handleModeChange }: RegisterCardProps) => {
  const {
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm<RegisterInput>({
    defaultValues: {
      [RegisterInputName.EMAIL]: "",
      [RegisterInputName.FIRST_NAME]: "",
      [RegisterInputName.LAST_NAME]: "",
      [RegisterInputName.PASSWORD]: "",
      [RegisterInputName.CONFIRM_PASSWORD]: "",
      [RegisterInputName.REMEMBER_ME]: false,
    },
  });
  const onSubmit: SubmitHandler<RegisterInput> = (data) => console.log(data);

  return (
    <div className="register-action-container">
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <img className="register-action-logo" src={budgetsterLogo} />
        <h1>{"Let's get started."}</h1>

        <FormInput
          name={RegisterInputName.EMAIL}
          control={control}
          label="Email"
          placeholder="example@budgetster.com"
          type="email"
        />
        <div className="register-action-names-container">
          <FormInput
            name={RegisterInputName.FIRST_NAME}
            control={control}
            label="First name"
            placeholder="John"
            type="text"
          />
          <FormInput
            name={RegisterInputName.LAST_NAME}
            control={control}
            label="Last name"
            placeholder="Doe"
            type="text"
          />
        </div>

        <FormInput
          name={RegisterInputName.PASSWORD}
          control={control}
          label="Password"
          placeholder="•••••••••"
          type="password"
        />
        <FormInput
          name={RegisterInputName.CONFIRM_PASSWORD}
          control={control}
          label="Confirm Password"
          placeholder="•••••••••"
          type="password"
        />

        <FormCheckbox
          name={RegisterInputName.REMEMBER_ME}
          label="Remember me?"
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

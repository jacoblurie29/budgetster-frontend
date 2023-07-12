import type { RegisterInputName } from "../RegisterCard/RegisterCard.definitions";
import type { LoginInputName } from "../LoginCard/LoginCard.definitions";
import type { Control } from "react-hook-form";

export interface FormCheckboxProps {
  name: RegisterInputName.REMEMBER_ME | LoginInputName.REMEMBER_ME;
  label: string;
  defaultChecked: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
}

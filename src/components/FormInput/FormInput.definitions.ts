import type { LoginInputName } from "../LoginCard/LoginCard.definitions";
import type { RegisterInputName } from "../RegisterCard/RegisterCard.definitions";
import type { Control } from "react-hook-form";

export interface FormInputProps {
  name: RegisterInputName | LoginInputName;
  type: string;
  label?: string;
  placeholder: string;
  defaultValue?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
}

import type { UseFormRegister, FieldValues } from "react-hook-form";

export interface FormInputProps {
  type: string;
  name: string;
  label?: string;
  placeholder: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  register: UseFormRegister<FieldValues>;
  errors: any;
}

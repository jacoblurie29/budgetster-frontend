import type { SettingsBudgetInputName } from "../../pages/settings/Settings.definitions";
import type { LoginInputName } from "../LoginCard/LoginCard.definitions";
import type { RegisterInputName } from "../RegisterCard/RegisterCard.definitions";
import type { Control } from "react-hook-form";

/**
 * @interface FormInputProps
 *
 * @param {string} name - name of the input (for react-hook-form data)
 * @param {string} type - type of the input (e.g. text, password, email)
 * @param {string} label - label of the input (optional, appears top left)
 * @param {string} placeholder - placeholder of the input (optional)
 * @param {string} defaultValue - default value of the input (optional)
 * @param {string} optText - optional text of the input (optional, displayed in gray next to label in parentheses)
 * @param {any} control - control of the input (from react-hook-form)
 * @param {string} error - error of the input (optional, displayed in red next to label)
 */
export interface FormInputProps {
  name: RegisterInputName | LoginInputName | SettingsBudgetInputName;
  type: string;
  label?: string;
  placeholder?: string;
  optText?: string;
  defaultValue?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
  error?: string;
}

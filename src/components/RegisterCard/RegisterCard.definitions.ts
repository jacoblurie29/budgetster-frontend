/* eslint-disable autofix/no-unused-vars */
import type { AuthType } from "../../types/types";

export interface RegisterCardProps {
  handleModeChange: (_: AuthType) => void;
}

/**
 * @interface RegisterInput - Interface for a register input.
 *
 * @param {string} email - The email of the user.
 * @param {string} firstName - The first name of the user.
 * @param {string} lastName - The last name of the user.
 * @param {string} password - The password of the user.
 * @param {string} confirmPassword - The confirm password of the user (must match password).
 */
export interface RegisterInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
}

/**
 * @enum RegisterInputName - Enum for the name of a register input (needed for react-hook-form)
 *
 * @param {string} EMAIL - The email of the user.
 * @param {string} FIRST_NAME - The first name of the user.
 * @param {string} LAST_NAME - The last name of the user.
 * @param {string} PASSWORD - The password of the user.
 * @param {string} CONFIRM_PASSWORD - The confirm password of the user (must match password).
 */
export enum RegisterInputName {
  EMAIL = "email",
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
  REMEMBER_ME = "rememberMe",
}

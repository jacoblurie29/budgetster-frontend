/* eslint-disable autofix/no-unused-vars */
import type { AuthType } from "../../types/types";

export interface LoginCardProps {
  handleModeChange: (_: AuthType) => void;
}

/**
 * @interface LoginInput - Interface for a login input.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 */
export interface LoginInput {
  email: string;
  password: string;
  rememberMe: boolean;
}

/**
 * @enum LoginInputName - Enum for the name of a login input (needed for react-hook-form)
 *
 * @param {string} EMAIL - The email of the user.
 * @param {string} PASSWORD - The password of the user.
 */
export enum LoginInputName {
  EMAIL = "email",
  PASSWORD = "password",
  REMEMBER_ME = "rememberMe",
}

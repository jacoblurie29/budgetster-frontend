import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email format").required("required"),
  password: yup.string().required("required"),
  rememberMe: yup.boolean(),
});

export const registerSchema = yup.object().shape({
  email: yup.string().email("invalid email format").required("required"),
  password: yup
    .string()
    .required("required")
    .min(8, "must be at least 8 characters long")
    .max(31, "must be less than 32 characters long")
    .matches(/[a-z]/, "must contain at least one lowercase letter")
    .matches(/[A-Z]/, "must contain at least one uppercase letter")
    .matches(/\d/, "must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "must contain at least one special character"
    ),
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  confirmPassword: yup
    .string()
    .equals([yup.ref("password")], "passwords must match")
    .required("required"),
  rememberMe: yup.boolean(),
});

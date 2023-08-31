import * as yup from "yup";

export const settingsBudgetSchema = yup.object().shape({
  budget: yup
    .number()
    .required("Budget is required")
    .typeError("Amount must be a number")
    .min(0, "Must be a positive number or zero!"),
});

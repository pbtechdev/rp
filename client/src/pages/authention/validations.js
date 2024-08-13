import * as yup from "yup";

export const loginValidations = yup.object().shape({
  userName: yup
    .string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters length"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters length"),
});



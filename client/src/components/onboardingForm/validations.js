import * as yup from "yup";

export const onboardingValidations = yup.object().shape({
  companyName: yup.string().required("Company Name is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  newPassword: yup
    .string()
    .required("New Password is required")
    .min(6, "Password should contain at least 6 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/,
      "Password should contain 1 uppercase, 1 lowercase, 1 number, and 1 special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
  companyLogo: yup.mixed().required("Company logo is required"),
  contactNubmer: yup
    .string()
    .matches(/^[0-9]+$/, "Mobile Number must be digits only")
    .required("Mobile Number is required"),
  linkedIn: yup
    .string()
    .url("Must be a valid URL"),
  facebook: yup
    .string()
    .url("Must be a valid URL"),
  twitter: yup
    .string()
    .url("Must be a valid URL"),
});

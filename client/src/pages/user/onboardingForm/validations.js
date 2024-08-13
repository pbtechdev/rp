import * as yup from "yup";

export const onboardingValidations = yup.object().shape({
  companyName: yup.string().required("Company Name is required"),
  newPassword: yup
    .string()
    .required("New Password is required")
    .min(
      6,
      "Password should contain 1 uppercase,1 lowercase, one number,at least a special character"
    ),
  companyLogo: yup.string().required("Company logo is required"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .min(
      6,
      "Password should contain 1 uppercase,1 lowercase, one number,at least a special character"
    ),
});

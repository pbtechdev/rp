import * as yup from "yup";

export const onboardingValidations = yup.object().shape({
  companyName: yup.string().min(2).max(50).required("Company Name is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .min(2)
    .max(2000)
    .required("Email is required"),
  companyLogo: yup.mixed().required("Company logo is required"),
  linkedIn: yup.string().url("Must be a valid URL"),
  facebook: yup.string().url("Must be a valid URL"),
  twitter: yup.string().url("Must be a valid URL"),
  portfolioSite: yup.string().url("Must be a valid URL"),
  industryType: yup.string().min(2).max(50),
});

import * as yup from "yup";

export const employeeValidations = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  secondaryEmail: yup.string().email("Invalid email"),
  mobileNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Mobile number must be digits only")
    .min(10, "Mobile number must be at least 10 digits"),
  address: yup.string().required("Address is required"),
});

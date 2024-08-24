import * as yup from "yup";

export const employeeValidations = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name cannot exceed 50 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email")
    .max(100, "Email cannot exceed 100 characters")
    .required("Email is required"),
  secondaryEmail: yup
    .string()
    .email("Invalid secondary email")
    .max(100, "Secondary Email cannot exceed 100 characters"),
  mobileNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Mobile number must be digits only")
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number cannot exceed 15 digits")
    .required("Mobile number is required"),
  address: yup
    .string()
    .min(10, "Address must be at least 10 characters long")
    .max(255, "Address cannot exceed 255 characters")
    .required("Address is required"),
  position: yup
    .string()
    .required("Position is required")
    .max(100, "Position cannot exceed 100 characters")
    .nullable(),
  team: yup
    .string()
    .required("Team is required")
    .max(50, "Team cannot exceed 50 characters"),
  employeeId: yup
    .string()
    .required("Employee ID is required")
    .min(3, "Employee ID must be at least 3 characters long")
    .max(20, "Employee ID cannot exceed 20 characters"),
  role: yup
    .string()
    .required("Role is required")
    .max(50, "Role cannot exceed 50 characters"),
  yearsOfExperience: yup
    .number()
    .typeError("Total experience must be a number")
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .required("Total experience is required")
    .min(0, "Experience must be at least 0 years")
    .max(50, "Experience must be less than or equal to 50 years"),

  joiningDate: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Joining Date is required"),
  salary: yup
    .number()
    .required("Salary is required")
    .typeError("Salary must be a number")
    .positive("Salary must be a positive number")
    .min(10000, "Salary must be at least 10,000")
    .max(10000000, "Salary cannot exceed 10,000,000"),
  variable: yup
    .number()
    // .required("Variable Pay is required")
    .typeError("Variable Pay must be a number")
    .positive("Variable Pay must be a positive number")
    .max(500000, "Variable Pay cannot exceed 500,000"),
  pan: yup
    .string()
    .required("PAN is required")
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number"),
  esicNo: yup
    .string()
    .required("ESIC No is required")
    .matches(/^[0-9]+$/, "ESIC No. must be digits only")
    .min(10, "ESIC No. must be at least 10 digits")
    .max(20, "ESIC No. cannot exceed 20 digits"),
  uan: yup
    .string()
    .required("UAN is required")
    .matches(/^[0-9]+$/, "UAN must be digits only")
    .min(12, "UAN must be exactly 12 digits")
    .max(12, "UAN must be exactly 12 digits"),
  bonus: yup
    .number()
    // .required("Bonus is required")
    .typeError("Bonus must be a number")
    .positive("Bonus must be a positive number")
    .max(1000000, "Bonus cannot exceed 1,000,000"),
  personalEmail: yup
    .string()
    .required("Personal Email is required")
    .email("Invalid personal email")
    .max(100, "Personal Email cannot exceed 100 characters"),
  gender: yup.string().required("Gender is required"),
  dateOfBirth: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Date of birth is required"),
});

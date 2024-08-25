import React from "react";
import { Box, Paper, Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../customInput";
import CustomButton from "../customButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { employeeValidations } from "./validations";
import FileUploader from "../fileUploader";
import { FormSubHeader } from "../formSubHeader";
import CustomDatePicker from "../customDatePicker";
import CustomAutocomplete from "../customAutoComplete";
import { useQuery } from "@tanstack/react-query";
import { get } from "../../service";
import { useAuth } from "../auth";
import CreateTeamDialog from "./CreateTeamDialog";

const roleOptions = [
  { label: "Manager", value: "MANAGER" },
  { label: "HR", value: "HR" },
  { label: "Team Lead", value: "LEAD" },
  { label: "Employee", value: "EMPLOYEE" },
];

const genderOptions = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Others", value: "OTHERS" },
];

const EmployeeForm = ({
  isPending,
  defaultValues,
  onSubmit,
  actionName = "Create",
  isEmployeeCreatePage,
}) => {
  const { user } = useAuth();
  const formMethods = useForm({
    values: defaultValues,
    resolver: yupResolver(employeeValidations),
  });

  const linkedCompanyId =
    user?.role === "OWNER" ? user?._id : user?.linkedCompanyId;

  const { data } = useQuery({
    queryKey: ["GET_TEAMS"],
    queryFn: () => get(`/get_teams`, { params: { linkedCompanyId } }),
  });

  const teamOptions = data?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  return (
    <FormProvider {...formMethods}>
      <Box sx={{ p: 1 }}>
        <Stack sx={{ flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
          {!isEmployeeCreatePage && (
            <Paper
              variant="outlined"
              sx={{
                minHeight: "250px",
                position: "relative",
                height: "20%",
                p: 2,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <FileUploader
                height={180}
                width={180}
                maxSize={10000}
                accept={[".png", ".jpg", ".jpeg"]}
                name="profilePic"
              />
            </Paper>
          )}
          <Paper
            variant="outlined"
            component="form"
            noValidate
            autoComplete="off"
            sx={{ p: 3, pt: 2, flexGrow: 1 }}
            onSubmit={formMethods.handleSubmit(onSubmit)}
          >
            <Stack direction="column" spacing={2}>
              {/* Employee Information */}
              <FormSubHeader label="Employee Information" />
              <Stack direction="row" spacing={2}>
                <CustomInput label="Name" name="name" required />
                <CustomInput label="Email" name="email" type="email" required />
              </Stack>
              <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                <CustomInput
                  label="Employee ID"
                  name="employeeId"
                  type="number"
                  required
                />
                <Box width="100%">
                  <CustomAutocomplete
                    label="Team"
                    name="teamId"
                    required
                    options={teamOptions}
                    placeholder="Select a team"
                  />
                  <CreateTeamDialog />
                </Box>
              </Stack>
              <Stack direction="row" spacing={2}>
                <CustomAutocomplete
                  name="role"
                  options={roleOptions}
                  label="Role"
                  placeholder="Select a role"
                  required
                />
                <CustomInput label="Position" name="position" type="text" />
              </Stack>
              <Stack direction="row" spacing={2}>
                <CustomInput
                  label="Total Experience"
                  name="totalYearsExperience"
                  type="number"
                />
                <CustomDatePicker label="Joining Date" name="joiningDate" />
              </Stack>

              {/* Payment Details */}
              <FormSubHeader label="Payment Details" sx={{ mb: 1 }} />
              <Stack direction="row" spacing={2}>
                <CustomInput
                  label="Salary"
                  name="paymentInfo.salary"
                  type="number"
                />
                <CustomInput
                  label="Variable Pay"
                  name="paymentInfo.variables"
                  type="number"
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <CustomInput
                  label="PAN No."
                  name="paymentInfo.pan"
                  type="text"
                />
                <CustomInput
                  label="ESIC No."
                  name="paymentInfo.esiNo"
                  type="number"
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <CustomInput label="UAN" name="paymentInfo.uan" type="number" />
                <CustomInput
                  label="Bonus"
                  name="paymentInfo.bonus"
                  type="number"
                />
              </Stack>

              {/* Personal Information */}
              <FormSubHeader label="Personal Information" sx={{ mb: 1 }} />
              <Stack direction="row" spacing={2}>
                <CustomInput
                  label="Personal Email"
                  name="personalInfo.personalEmail"
                  type="email"
                />
                <CustomInput
                  label="Mobile Number"
                  name="personalInfo.mobileNumber"
                  type="number"
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <CustomAutocomplete
                  label="Gender"
                  name="personalInfo.gender"
                  options={genderOptions}
                />
                <CustomDatePicker
                  label="Date of Birth"
                  name="personalInfo.dateOfBirth"
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <CustomInput
                  label="Address"
                  name="personalInfo.address"
                  fullWidth
                  multiline
                  rows={4}
                />
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flexGrow: 1,
                }}
              >
                <CustomButton loading={isPending}>{actionName}</CustomButton>
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default EmployeeForm;

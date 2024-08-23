import React, { useEffect, useState } from "react";
import { Box, Paper, Stack } from "@mui/material";
import {  FormProvider, useForm } from "react-hook-form";
import CustomInput from "../customInput";
import CustomButton from "../customButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { employeeValidations } from "./validations";
import FileUploader from "../fileUploader";
import { FormSubHeader } from "../formSubHeader";
import { useNavigate } from "react-router-dom";
import CustomDatePicker from "../customDatePicker";
import CustomAutocomplete from "../customAutoComplete";
import CustomIconAutocomplete from "../customIconAutoComplete";

const EmployeeForm = ({
  isPending,
  defaultValues,
  onSubmit,
  actionName = "Create",
}) => {
  const navigate = useNavigate();
  const formMethods = useForm({
    defaultValues,
    resolver: yupResolver(employeeValidations),
  });

  const { control } = formMethods;
  const [teamValue, setTeamValue] = useState(defaultValues?.team || "");

  const roleOptions = [
    { title: "Owner", value: "OWNER" },
    { title: "Manager", value: "MANAGER" },
    { title: "HR", value: "HR" },
    { title: "Team Lead", value: "LEAD" },
    { title: "Employee", value: "EMPLOYEE" },
  ];

  const genderOptions = [
    { title: "Male", value: "MALE" },
    { title: "Female", value: "FEMALE" },
    { title: "Others", value: "OTHERS" },
  ];

  const teamOptions = [
    { title: "FrontEnd", value: "frontEnd" },
    { title: "BackEnd", value: "backeEnd" },
    { title: "Others", value: "OTHERS" },
  ];

  useEffect(() => {
    if (defaultValues) {
      formMethods.reset(defaultValues);
    }
  }, [defaultValues]);

  return (
    <FormProvider {...formMethods}>
      <Box sx={{ p: 1 }}>
        <Stack sx={{ flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
          <Paper
            variant="outlined"
            sx={{
              minHeight: "310px",
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
              name="avatar"
            />
          </Paper>
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
              <Stack direction="row" spacing={2} sx={{width:"100%"}}>
                <CustomInput label="Position" name="position" type="text" />
                <Box width="100%">
                <CustomIconAutocomplete
                  label="Team"
                  name="team"
                  options={teamOptions}
                  control={control}
                  value={teamValue}
                  onChange={(newValue) => setTeamValue(newValue)}
                  iconColor="primary.main" 
                />
                </Box>
              </Stack>
              <Stack direction="row" spacing={2}>
                <CustomInput
                  label="Employee ID"
                  name="employeeId"
                  type="number"
                />
                <CustomAutocomplete
                  name="role"
                  control={control}
                  options={roleOptions}
                  label="Role"
                  placeholder="Select a role"
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <CustomDatePicker
                  label="Total Experience"
                  name="yearsOfExperience"
                  type="number"
                />
                <CustomDatePicker
                  label="Joining Date"
                  name="joiningDate"
                  control={control}
                  rules={{ validate: "" }}
                  defaultValue=""
                />
              </Stack>

              {/* Payment Details */}
              <FormSubHeader label="Payment Details" sx={{ mb: 1 }} />
              <Stack direction="row" spacing={2}>
                <CustomInput label="Salary" name="salary" type="number" />
                <CustomInput
                  label="Variable Pay"
                  name="variable"
                  type="number"
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <CustomInput label="PAN No." name="pan" type="text" />
                <CustomInput label="ESIC No." name="esicNo" type="number" />
              </Stack>
              <Stack direction="row" spacing={2}>
                <CustomInput label="UAN" name="uan" type="number" />
                <CustomInput label="Bonus" name="bonus" type="number" />
              </Stack>

              {/* Personal Information */}
              <FormSubHeader label="Personal Information" sx={{ mb: 1 }} />
              <Stack direction="row" spacing={2}>
                <CustomInput
                  label="Personal Email"
                  name="personalEmail"
                  type="email"
                />
                <CustomInput
                  label="Mobile Number"
                  name="mobileNumber"
                  type="number"
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <CustomAutocomplete
                  label="Gender"
                  name="gender"
                  options={genderOptions}
                />
                <CustomDatePicker
                  label="Date of Birth"
                  name="dateOfBirth"
                  control={control}
                  rules={{ validate: "" }}
                  defaultValue=""
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <CustomInput
                  label="Address"
                  name="address"
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

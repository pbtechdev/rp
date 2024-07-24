import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../../components/customInput";
import CustomButton from "../../components/customButton";

const roleOptions = [
  { value: "developer", label: "Developer" },
  { value: "manager", label: "Manager" },
  { value: "designer", label: "Designer" },
];

const roleTypeOptions = [
  { value: "employee", label: "Employee" },
  { value: "founder", label: "Founder" },
  { value: "coFounder", label: "Co-Founder" },
];

const bloodGroupOptions = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
];

const ProfileCreationPage = () => {
  const formMethods = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Paper
      component="form"
      noValidate
      autoComplete="off"
      sx={{ px: 2, pt: 2, pb: 4 }}
      onSubmit={formMethods.handleSubmit(onSubmit)}
    >
      <FormProvider {...formMethods}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h4">Create Profile</Typography>
          <CustomInput label="Name" name="name" required />
          <CustomInput label="Company Name" name="companyName" required />
          <CustomInput
            label="Role"
            name="role"
            required
            select
            options={roleOptions}
          />
          <CustomInput
            label="Role Type"
            name="roleType"
            required
            select
            options={roleTypeOptions}
          />
          <CustomInput label="Email Address" name="email" required />
          <CustomInput
            label="Secondary Email (Optional)"
            name="personalEmail"
            required
          />
          <CustomInput label="Phone No." name="phnoneNumber" required />
          <CustomInput
            label="Blood Group"
            name="bloodGroup"
            required
            select
            options={bloodGroupOptions}
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}
          >
            <CustomButton>Save</CustomButton>
          </Box>
        </Stack>
      </FormProvider>
    </Paper>
  );
};

export default ProfileCreationPage;

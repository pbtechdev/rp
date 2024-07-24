import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import PageHeader from "../../components/pageHeader";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../../components/customInput";
import CustomButton from "../../components/customButton";

const CompanyOnboardingForm = () => {
  const formMethods = useForm();
  const onSubmit = () => {};
  return (
    <Paper
      component="form"
      autoComplete="off"
      sx={{ px: 2, pt: 2, pb: 4 }}
      onSubmit={formMethods.handleSubmit(onSubmit)}
    >
      <FormProvider {...formMethods}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h4">Create your company profile</Typography>
          <CustomInput label="Company Name" name="companyName" required />
          <CustomInput label="Email" name="email" required />
          <CustomInput label="New Password" name="newPassword" required />
          <CustomInput
            label="Confirm Password"
            name="confirmPassword"
            required
          />

          <CustomButton>Submit</CustomButton>
        </Stack>
      </FormProvider>
    </Paper>
  );
};

export default CompanyOnboardingForm;

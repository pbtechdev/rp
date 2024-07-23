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
    <>
      <PageHeader header="Company Onboarding Form" />
      <Paper
        component="form"
        autoComplete="off"
        sx={{ p: 2 }}
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <FormProvider {...formMethods}>
          <Stack direction="column" spacing={2} width={"75%"} p={2}>
            <CustomInput label="Company Name" name="companyName" required />
            <CustomInput label="Email" name="email" required />
            <Typography variant="v4">Reset Your Password</Typography>
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
    </>
  );
};

export default CompanyOnboardingForm;

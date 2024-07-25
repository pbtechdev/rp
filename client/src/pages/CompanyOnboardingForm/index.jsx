import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../../components/customInput";
import CustomButton from "../../components/customButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { onboardingValidations } from "./validations";
import FileUploader from "../../components/fileUploader";

const CompanyOnboardingForm = () => {
  const formMethods = useForm({
    defaultValues: { companyName: "", newPassword: "", confirmPassword: "" },
    resolver: yupResolver(onboardingValidations),
  });
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
          <Typography variant="h4">Create your company profile</Typography>
          <CustomInput label="Company Name" name="companyName" required />
          <FileUploader
            height={200}
            width={200}
            maxSize={10000}
            accept={[".png", ".jpg", ".jpeg"]}
            name="companyLogo"
          />
          <CustomInput label="Email" name="email" required />
          <CustomInput label="New Password" name="newPassword" required />
          <CustomInput
            label="Confirm Password"
            name="confirmPassword"
            required
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}
          >
            <CustomButton>Submit</CustomButton>
          </Box>
        </Stack>
      </FormProvider>
    </Paper>
  );
};

export default CompanyOnboardingForm;

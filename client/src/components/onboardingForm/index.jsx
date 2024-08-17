import React, { useEffect } from "react";
import { Box, Paper, Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../customInput";
import CustomButton from "../customButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { onboardingValidations } from "./validations";
import FileUploader from "../fileUploader";
import { FormSubHeader } from "../formSubHeader";
import SocialLinks from "./SocialLinks";
import Stats from "./Stats";

const OnboardingForm = ({ isPending, defaultValues, onSubmit }) => {
  const formMethods = useForm({
    defaultValues,
    resolver: yupResolver(onboardingValidations),
  });

  console.log(formMethods.formState.errors);

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
              maxHeight: "50vh",
              position: "relative",
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
              name="companyLogo"
            />
            <SocialLinks />
            <Stats />
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
              <FormSubHeader label="Company Information" />
              <Stack direction="row" spacing={2}>
                <CustomInput label="Company Name" name="companyName" required />
                <CustomInput label="Email" name="email" type="email" required />
              </Stack>
              <Stack direction="row" spacing={2}>
                <CustomInput
                  label="New Password"
                  name="newPassword"
                  type="password"
                  required
                />
                <CustomInput
                  label="Confirm Password"
                  name="confirmPassword"
                  required
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <Box width="50%">
                  <CustomInput
                    label="Mobile Number"
                    name="contactNubmer"
                    type="number"
                    required
                  />
                </Box>
                <Box width="50%"></Box>
              </Stack>

              <FormSubHeader label="Social Media Links" />
              <Stack spacing={2} direction="row">
                <CustomInput label="LinkedIn" name="linkedIn" fullWidth />
                <CustomInput label="Facebook" name="facebook" fullWidth />
              </Stack>
              <Stack spacing={2} direction="row">
                <Box width="50%">
                  <CustomInput label="Twitter" name="twitter" fullWidth />
                </Box>
                <Box width="50%"></Box>
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flexGrow: 1,
                }}
              >
                <CustomButton loading={isPending}>Create</CustomButton>
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default OnboardingForm;

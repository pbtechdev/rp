import React from "react";
import { Box, Paper, Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../../../components/customInput";
import CustomButton from "../../../components/customButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { onboardingValidations } from "./validations";
import FileUploader from "../../../components/fileUploader";
import { FormSubHeader } from "../../../components/formSubHeader";
import SocialLinks from "./socialLinks";
import Stats from "./Stats";

const CompanyOnboardingForm = () => {
  const formMethods = useForm({
    defaultValues: {
      companyName: "",
      email: "",
      newPassword: "",
      confirmPassword: "",
      linkedIn: "",
      facebook: "",
      twitter: "",
      googleMap: "",
    },
    resolver: yupResolver(onboardingValidations),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

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
                <CustomInput label="Email" name="email" required />
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
                  type="password"
                  required
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <CustomInput
                  label="Role"
                  name="role"
                  variant="outlined"
                  select
                  options={[
                    { value: "CEO", label: "CEO" },
                    { value: "HR Manager", label: "HR Manager" },
                    { value: "Team Lead", label: "Team Lead" },
                    { value: "Employee", label: "Employee" },
                  ]}
                  required
                />
                <CustomInput
                  label="Mobile Number"
                  name="mobileNumber"
                  type="number"
                  required
                />
              </Stack>
              <FormSubHeader label="Address" />
              <Stack spacing={2}>
                <CustomInput
                  label="Address Line1"
                  name="addressLine1"
                  fullWidth
                />
                <CustomInput
                  label="Address Line2"
                  name="addressLine2"
                  fullWidth
                />
              </Stack>
              <Stack spacing={2} direction="row">
                <CustomInput label="Country" name="country" fullWidth />
                <CustomInput label="State" name="state" fullWidth />
              </Stack>
              <FormSubHeader label="Social Media Links" />
              <Stack spacing={2} direction="row">
                <CustomInput label="LinkedIn" name="linkedIn" fullWidth />
                <CustomInput label="Facebook" name="facebook" fullWidth />
              </Stack>
              <Stack spacing={2} direction="row">
                <CustomInput label="Twitter" name="twitter" fullWidth />
                <CustomInput label="Location" name="googleMap" fullWidth />
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flexGrow: 1,
                }}
              >
                <CustomButton>Create</CustomButton>
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default CompanyOnboardingForm;

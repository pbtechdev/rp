import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../../../components/customInput";
import CustomButton from "../../../components/customButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { onboardingValidations } from "./validations";
import FileUploader from "../../../components/fileUploader";
import { Icon } from "@iconify/react";

const CompanyOnboardingForm = () => {
  const [logoUploaded, setLogoUploaded] = useState(false);

  const formMethods = useForm({
    defaultValues: {
      companyName: "",
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(onboardingValidations),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleFileUpload = (file) => {
    setLogoUploaded(true);
  };

  return (
    <FormProvider {...formMethods}>
      <Box sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} position="relative">
          <Paper variant="outlined" sx={{ maxHeight: "50vh", p: 2 }}>
            <Box sx={{ position: "relative", width: 200, height: 200,display:'flex',justifyContent:'center',alignItems:'center' }}>
              <FileUploader
                height={180}
                width={180}
                maxSize={10000}
                accept={[".png", ".jpg", ".jpeg"]}
                name="companyLogo"
                onChange={handleFileUpload}
              />
              {logoUploaded && (
                <Icon
                  icon="lets-icons:camera-fill"
                  fontSize={24}
                  sx={{
                    // position: 'absolute',
                    bottom: 0,
                    right: 0,
                    top: -10,
                    left: -8,
                    // backgroundColor: 'white',
                    // borderRadius: '50%',
                    // padding: 2,
                  }}
                />
              )}
            </Box>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mt: 2, justifyContent: "center" }}
            >
              <Icon icon="devicon:linkedin" fontSize={24} />
              <Icon icon="devicon:facebook" fontSize={24} />
              <Icon icon="skill-icons:twitter" fontSize={24} />
              <Icon icon="logos:google-maps" fontSize={24} />
            </Stack>
          </Paper>
          <Paper
            variant="outlined"
            component="form"
            noValidate
            autoComplete="off"
            sx={{ px: 2, pt: 2, pb: 4, flexGrow: 1 }}
            onSubmit={formMethods.handleSubmit(onSubmit)}
          >
            <Stack direction="column" spacing={2}>
              <Typography variant="h4">Company Information</Typography>
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
              <Divider />
              <Typography variant="h6">Address</Typography>
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flexGrow: 1,
                }}
              >
                <CustomButton>Submit</CustomButton>
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default CompanyOnboardingForm;

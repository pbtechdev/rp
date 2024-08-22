import React, { useEffect } from "react";
import { Box, Paper, Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../customInput";
import CustomButton from "../customButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { employeeValidations } from "./validations";
import FileUploader from "../fileUploader";
import { FormSubHeader } from "../formSubHeader";
import { useNavigate } from "react-router-dom";

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
              <FormSubHeader label="Employee Information" />
              <Stack direction="row" spacing={2}>
                <CustomInput label="Name" name="name" required />
                <CustomInput label="Email" name="email" type="email" required />
              </Stack>

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
                <CustomInput label="Position" name="posiion" type="text" />
                <CustomInput label="Team" name="team" type="text" />
              </Stack>
              <Stack direction="row" spacing={2}>
                <CustomInput label="Gender" name="gender" type="text" />
                <CustomInput
                  label="Total Experience"
                  name="yearsOfExperience"
                  type="number"
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

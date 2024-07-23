import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import PageHeader from "../../components/pageHeader";
import { Controller } from "react-hook-form";

const CompanyOnboardingForm = () => {
  return (
    <>
      <PageHeader header="Company Onboarding Form" />
      <Paper
        component="form"
        autoComplete="off"
        sx={{ p: 2 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack direction="column" spacing={2} width={"75%"} p={2}>
          <ControlledInput
            control={control}
            label="Company Name"
            name="companyName"
            required
          />
          <ControlledInput
            control={control}
            label="Email"
            name="email"
            required
          />
          <Typography variant="v4">Reset Your Password</Typography>
          <ControlledInput
            control={control}
            label="New Password"
            name="newPassword"
            required
          />
          <ControlledInput
            control={control}
            label="Confirm Password"
            name="confirmPassword"
            required
          />
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CustomButton title="Submit" loading={isLoading} />
        </Box>
      </Paper>
    </>
  );
};

export default CompanyOnboardingForm;

const ControlledInput = ({
  name,
  control,
  disabled,
  label,
  required,
  multiline,
  rows,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...rest }, fieldState: { error } }) => (
        <TextField
          multiline={multiline}
          rows={rows}
          {...rest}
          disabled={disabled}
          inputRef={ref}
          label={label}
          required={required}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};

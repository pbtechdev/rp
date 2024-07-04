import { Box } from "@mui/material";
import React from "react";
import CustomInput from "../../components/CustomInput";
import { FormProvider, useForm } from "react-hook-form";

const User = () => {
  const formMethods = useForm();
  return (
    <Box>
      <FormProvider {...formMethods}>
        <CustomInput placeholder="Name" name="name" />
      </FormProvider>
    </Box>
  );
};

export default User;

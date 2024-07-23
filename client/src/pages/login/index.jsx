import React from "react";
import CustomInput from "../../components/customInput";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { CenteredDiv } from "../../components/centeredDiv";
import CustomButton from "../../components/customButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidations } from "./validations";
import bgImage from "../../assets/loginBgPic.jpg";
import { getUserDetails } from "../../service/mutations";
import { useMutation } from "@tanstack/react-query";
import TypeWriterAnimation from "../../components/typeWriterAnimation";

const Login = () => {
  const formMethods = useForm({
    defaultValues: { userName: "", password: "" },
    resolver: yupResolver(loginValidations),
  });

  const { mutate } = useMutation({ mutationFn: getUserDetails });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <Box
      sx={{
        width: "100dvw",
        height: "100dvh",
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <Stack height="100%" direction="row">
        <CenteredDiv sx={{ flex: 1, display: { xs: "none", sm: "flex" } }}>
          <TypeWriterAnimation />
        </CenteredDiv>
        <CenteredDiv sx={{ flex: 1 }}>
          <Paper elevation={0} sx={{ p: 2 }}>
            <Stack
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={formMethods.handleSubmit(onSubmit)}
              minWidth={300}
              minHeight={200}
              spacing={2}
            >
              <Typography textAlign="center" variant="h4">
                Log In
              </Typography>
              <FormProvider {...formMethods}>
                <CustomInput label="Username" name="userName" />
                <CustomInput label="Password" name="password" />
                <CustomButton>Login</CustomButton>
              </FormProvider>
            </Stack>
          </Paper>
        </CenteredDiv>
      </Stack>
    </Box>
  );
};

export default Login;

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { CenteredDiv } from "../../components/centeredDiv";
import CustomButton from "../../components/customButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidations } from "./validations";
import bgImage from "../../assets/loginBgPic.jpg";
import TypeWriterAnimation from "../../components/typeWriterAnimation";
import CustomInput from "../../components/customInput";
import { useAuth } from "../auth";

const Login = () => {
  const formMethods = useForm({
    defaultValues: { userName: "", password: "" },
    resolver: yupResolver(loginValidations),
  });

  const { logIn, isPending } = useAuth();

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
              // autoComplete="off" todo:should add this back
              onSubmit={formMethods.handleSubmit(logIn)}
              minWidth={300}
              spacing={2}
            >
              <Typography textAlign="center" variant="h4">
                Log In
              </Typography>
              <FormProvider {...formMethods}>
                <CustomInput label="Username" name="userName" />
                <CustomInput label="Password" name="password" />
                <CustomButton loading={isPending}>Login</CustomButton>
              </FormProvider>
            </Stack>
          </Paper>
        </CenteredDiv>
      </Stack>
    </Box>
  );
};

export default Login;

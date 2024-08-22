import React, { useEffect } from "react";
import { Box, Paper, Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../customInput";
import CustomButton from "../customButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { onboardingValidations } from "./validations";
import FileUploader from "../fileUploader";
import { FormSubHeader } from "../formSubHeader";
import Stats from "./Stats";
import SocialLinks from "./SocialLinks";
import { useNavigate } from "react-router-dom";

const CompanyForm = ({
  employeesCount,
  teamsCount,
  isPending,
  defaultValues,
  onSubmit,
  actionName = "Create",
}) => {
  const navigate = useNavigate();
  const formMethods = useForm({
    defaultValues,
    resolver: yupResolver(onboardingValidations),
  });

  useEffect(() => {
    if (defaultValues) {
      formMethods.reset(defaultValues);
    }
  }, [defaultValues]);

  const handleClick = (clickFrom) => {
    if (clickFrom === "EMPOLYEE" && employeesCount > 0) {
      navigate("/employee-list");
    }
    if (clickFrom === "TEAMS" && teamsCount > 0) {
      navigate("/teams-list");
    }
  };

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
              name="companyLogo"
            />
            <SocialLinks />
            <Box>
              <Stats
                handleClick={() => handleClick("EMPOLYEE")}
                label="Employees"
                count={employeesCount}
              />
              <Stats
                handleClick={() => handleClick("TEAMS")}
                label="Teams"
                count={employeesCount}
              />
            </Box>
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
                <Box width="50%">
                  <CustomInput
                    label="Industry Type"
                    name="industryType"
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
                <CustomInput label="Twitter" name="twitter" fullWidth />
                <CustomInput label="Website" name="portfolioSite" fullWidth />
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

export default CompanyForm;

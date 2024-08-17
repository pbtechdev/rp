import { Box, Divider, Typography } from "@mui/material";
import { styled } from "@mui/system";

const FormSubHeaderWrapper = styled(Box)(({ theme }) => ({
  paddingBottom: theme.spacing(1),
  paddingTop: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
}));

export const FormSubHeader = ({ label }) => (
  <FormSubHeaderWrapper>
    <Typography variant="h6" gutterBottom={false}>
      {label}
    </Typography>
    <Divider />
  </FormSubHeaderWrapper>
);

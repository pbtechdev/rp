import { Box, Divider, Typography } from "@mui/material";
import { styled } from "@mui/system";

const FormSubHeaderWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column',
}));

export const FormSubHeader = ({ label }) => (
  <FormSubHeaderWrapper>
    <Typography variant="h6" gutterBottom={false}>
      {label}
    </Typography>
    <Divider sx={{mb:2}}/>
  </FormSubHeaderWrapper>
);
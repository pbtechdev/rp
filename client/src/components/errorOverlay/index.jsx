import { Box, styled } from "@mui/material";
import errorPic from "../../assets/errorPic.png"; 

const StyledGridOverlay = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
}));

function ErrorOverlay({ message }) {
  return (
    <StyledGridOverlay>
      <img src={errorPic} alt="Error" style={{ width: 120, height: 100 }} />
      <Box sx={{ mt: 1 }}>
        {message ?? "No Records Found"}
      </Box>
    </StyledGridOverlay>
  );
}

export default ErrorOverlay;

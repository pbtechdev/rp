import { Box } from "@mui/material";
import errorPic from "../../assets/errorPic.png";
import React from "react";

const ErrorOverlay = () => {
  return (
    <Box>
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60dvh" ,width: "40dvw"}}>
      <img src={errorPic} alt="Error Overlay"  />
    </Box>
  </Box>
  );
};

export default ErrorOverlay;

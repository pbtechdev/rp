import React from "react";
import { Typography, Box } from "@mui/material";
import pageNotFound from "../../assets/pageNotFound.jpg";
import styled from "@emotion/styled";
import ImageComponent from "../imageComponent";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  gap: "20px",
  "& .imageWrapper": {
    mixBlendMode: "multiply",
  },
  "& .wrapper": {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
  },
}));

const PageNotFound = () => {
  return (
    <StyledBox>
      <Box maxWidth="550px">
        <ImageComponent className="imageWrapper" src={pageNotFound} alt="404" />
      </Box>
      <Box className="wrapper">
        <Box>
          <Typography variant="h4" fontWeight="700">
            Opps! Something went wrong.
          </Typography>
          <Typography variant="h4">
            The page you are finding could not be found.
          </Typography>
        </Box>
      </Box>
    </StyledBox>
  );
};

export default PageNotFound;

import { Box, Button, CircularProgress, styled } from "@mui/material";
import React from "react";

const SytledButton = styled(Button)(({ loading }) => {
  const load = loading.toString() === "true" ? true : false;
  return {
    ".MuiButton-startIcon": {
      color: load ? "transparent" : "inherit",
    },
    ".loaderWrapper": {
      display: "inherit",
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
    },
    ".loader": {
      position: "relative",
      display: "inline-flex",
      WebkitBoxAlign: "center",
      alignItems: "center",
      WebkitBoxPack: "center",
      justifyContent: "center",
    },
    ".contentWrapper": {
      color: load ? "transparent" : "inherit",
    },
  };
});

const CustomButton = ({ disabled, loading, children, ...rest }) => {
  return (
    <SytledButton
      {...rest}
      loading={loading?.toString() ?? "false"}
      disabled={disabled || loading}
    >
      {loading && (
        <Box className="loaderWrapper">
          <CircularProgress size={25} className="loader" />
        </Box>
      )}
      <Box className="contentWrapper" component="span">
        {children}
      </Box>
    </SytledButton>
  );
};

export default CustomButton;

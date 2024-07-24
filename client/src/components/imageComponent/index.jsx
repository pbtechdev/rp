import React from "react";
import { Box } from "@mui/material";

const ImageComponent = ({ src, alt, className, ...rest }) => {
  return (
    <Box {...rest}>
      <img
        src={src}
        className={className}
        alt={alt}
        width="100%"
        height="100%"
      />
    </Box>
  );
};

export default ImageComponent;

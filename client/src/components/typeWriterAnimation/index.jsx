import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { Typography } from "@mui/material";

const TypeWriterAnimation = () => {
  return (
    <Typography
      sx={{ color: "common.white", fontSize: "3rem",fontStyle:'italic' }}
      component="div"
    >
      <Typewriter
        words={["Welcome to Job Portal !"]}
        loop
        cursor
        cursorStyle="_"
        typeSpeed={100}
        deleteSpeed={50}
        delaySpeed={1000}
      />
    </Typography>
  );
};

export default TypeWriterAnimation;

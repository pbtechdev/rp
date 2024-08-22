import React from "react";
import { Button } from "@mui/material";

const Stats = ({ label, handleClick, count = 0 }) => {
  return (
    <Button onClick={handleClick} variant="text" fullWidth>
      {label} : {count}
    </Button>
  );
};

export default Stats;

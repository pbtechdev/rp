import { Divider, Stack, Typography } from "@mui/material";
import React from "react";

const Stats = () => {
  return (
    <Stack justifyContent="center" spacing={3} direction="row" padding="10px">
      <Stack alignItems="center">
        <Typography sx={{ fontWeight: "bold", p: 1 }}>100</Typography>
        <Typography>Projects</Typography>
      </Stack>
      <Divider orientation="vertical" flexItem />
      <Stack alignItems="center">
        <Typography sx={{ fontWeight: "bold", p: 1 }}>100</Typography>
        <Typography>Employees</Typography>
      </Stack>
    </Stack>
  );
};

export default Stats;

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";

const CustomInput = ({ name, variant, control: controlProp, ...rest }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={controlProp ? controlProp : control}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            variant={variant ?? "outlined"}
            {...field}
            {...rest}
            error={!!error}
            helperText={error?.message}
          />
        );
      }}
    />
  );
};

export default CustomInput;

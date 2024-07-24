import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const CustomInput = ({ name, variant, control: controlProp, options, ...rest }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={controlProp || control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          variant={variant ?? "outlined"}
          {...field}
          {...rest}
          select={!!options}
          error={!!error}
          helperText={error?.message}
        >
          {options && options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default CustomInput;

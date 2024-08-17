import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { FormLabel, Stack } from "@mui/material";

const CustomInput = ({
  name,
  variant,
  control: controlProp,
  options,
  label,
  ...rest
}) => {
  const { control } = useFormContext();

  return (
    <Stack width='100%' direction='column'>
    <FormLabel sx={{fontSize:"14px"}}>{label}</FormLabel>
      <Controller
        name={name}
        control={controlProp || control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            variant={variant ?? "outlined"}
            {...field}
            {...rest}
            size="small"
            select={!!options}
            error={!!error}
            helperText={error?.message}
            InputProps={{
              style: {
                borderRadius: "4px",
              }
            }}
          >
            {options &&
              options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
          </TextField>
        )}
      />
    </Stack>
  );
};

export default CustomInput;

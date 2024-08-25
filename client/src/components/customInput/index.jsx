import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FormLabel, Stack } from "@mui/material";

const CustomInput = ({
  name,
  variant,
  control: controlProp,
  label,
  required,
  ...rest
}) => {
  const { control } = useFormContext();

  return (
    <Stack width="100%" direction="column">
      <FormLabel required={required} sx={{ fontSize: "14px" }}>
        {label}
      </FormLabel>
      <Controller
        name={name}
        control={controlProp || control}
        render={({
          field: { value, ...restFeildProps },
          fieldState: { error },
        }) => (
          <TextField
            variant={variant ?? "outlined"}
            value={value ?? ""}
            {...restFeildProps}
            {...rest}
            size="small"
            error={!!error}
            helperText={error?.message}
            InputProps={{
              style: {
                borderRadius: "4px",
              },
            }}
          />
        )}
      />
    </Stack>
  );
};

export default CustomInput;

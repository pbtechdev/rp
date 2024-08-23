import React from "react";
import {
  Autocomplete,
  CircularProgress,
  TextField,
  Stack,
  FormLabel,
} from "@mui/material";
import { Controller } from "react-hook-form";

const CustomAutocomplete = ({
  options,
  name,
  label,
  control,
  rules = {},
  loading = false,
  required = false,
  defaultValue = "",
  placeholder,
  inputWidth = "100%",
}) => {
  return (
    <Stack width={inputWidth} direction="column">
      <FormLabel required={required} sx={{ fontSize: "14px" }}>
        {label}
      </FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field, fieldState: { error } }) => {
          const { onChange, value, ref, onBlur } = field;

          return (
            <Autocomplete
              value={
                value !== undefined
                  ? options.find((option) => value === option.value) ?? null
                  : null
              }
              onChange={(_event, newValue) => {
                onChange(newValue ? newValue.value : defaultValue);
              }}
              options={options}
              isOptionEqualToValue={(option, selectedOption) =>
                option.value === selectedOption.value
              }
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onBlur={onBlur}
                  inputRef={ref}
                  required={required}
                  error={!!error}
                  helperText={error?.message}
                  placeholder={placeholder}
                  size="small"
                  sx={{ 
                    width: inputWidth, 
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "4px",
                    },
                  }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading && (
                          <CircularProgress color="inherit" size={20} />
                        )}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          );
        }}
      />
    </Stack>
  );
};

export default CustomAutocomplete;

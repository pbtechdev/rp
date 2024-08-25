import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";
import { FormLabel, Stack } from "@mui/material";

const CustomDatePicker = ({
  control,
  name,
  label,
  rules = {},
  defaultValue,
  disabled = false,
  required = false,
  textFieldProps,
  ...rest
}) => {
  const { control: contextControl } = useFormContext();

  return (
    <Stack width="100%" direction="column">
      <FormLabel required={required} sx={{ fontSize: "14px" }}>
        {label}
      </FormLabel>
      <Controller
        name={name}
        control={control ? control : contextControl}
        rules={rules}
        defaultValue={defaultValue ?? null}
        render={({ field, fieldState: { error } }) => {
          const handleDateChange = (date) => {
            field.onChange(date.toISOString());
          };

          const commonProps = {
            disabled,
            onAccept: field.onBlur,
            onChange: handleDateChange,
            value: dayjs(field.value),
            slotProps: {
              textField: {
                error: !!error,
                helperText: error?.message,
                onBlur: field.onBlur,
                ...textFieldProps,
                size: "small",
                InputProps: {
                  style: {
                    borderRadius: "4px",
                  },
                },
              },
            },
            ...rest,
          };

          return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="DD/MM/YYYY"
                inputRef={field.ref}
                {...commonProps}
              />
            </LocalizationProvider>
          );
        }}
      />
    </Stack>
  );
};

export default CustomDatePicker;

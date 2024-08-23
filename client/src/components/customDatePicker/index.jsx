import {
    DatePicker,
    DateTimePicker,
    LocalizationProvider,
  } from "@mui/x-date-pickers";
  import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
  import dayjs from "dayjs";
  import React from "react";
  import { Controller } from "react-hook-form";
  import { FormLabel, Stack } from "@mui/material";
  
  const formatDate = (date, type) => {
    if (type === "date") {
      return date ? date.format("YYYY-MM-DDT00:00:00") : null;
    } else {
      return date ? date.format("YYYY-MM-DDTHH:mm:ss") : null;
    }
  };
  
  const CustomDatePicker = ({
    control,
    name,
    label,
    rules = {},
    defaultValue,
    disabled = false,
    required = false,
    type = "date",
    textFieldProps,
    isPastDisabled = false,
    ...rest
  }) => {
    return (
      <Stack width="100%" direction="column">
        <FormLabel required={required} sx={{ fontSize: "14px" }}>
          {label}
        </FormLabel>
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={defaultValue ?? null}
          render={({ field, fieldState: { error } }) => {
            const handleDateChange = (date) => {
              const formatedDate = formatDate(date, type);
              field.onChange(formatedDate);
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
  
            const minDate = isPastDisabled ? dayjs().startOf("day") : undefined;
            
            return (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {type === "date-time" ? (
                  <DateTimePicker
                    timeSteps={{ minutes: 1 }}
                    sx={{ width: "100%" }}
                    inputRef={field.ref}
                    format="DD/MM/YYYY hh:mm a"
                    {...commonProps}
                  />
                ) : (
                  <DatePicker
                    format="DD/MM/YYYY"
                    minDate={minDate}
                    inputRef={field.ref}
                    {...commonProps}
                  />
                )}
              </LocalizationProvider>
            );
          }}
        />
      </Stack>
    );
  };
  
  export default CustomDatePicker;
  
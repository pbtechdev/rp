import React, { useState } from "react";
import {
  Autocomplete,
  TextField,
  IconButton,
  InputAdornment,
  Box,
  FormLabel,
  Stack,
} from "@mui/material";
import { Icon } from "@iconify/react";
import TeamDialog from "../teamDialog";

const CustomIconAutocomplete = ({
  label,
  name,
  options,
  value,
  onChange,
  required = false,
  ...props
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSave = (teamName) => {
    console.log("Team name:", teamName);
    handleCloseDialog();
  };

  const isOptionSelected = value === "OTHERS";

  return (
    <Stack width="100%" direction="column">
      <FormLabel required={required} sx={{ fontSize: "14px" }}>
        {label}
      </FormLabel>
      <Autocomplete
        {...props}
        value={options.find((option) => option.value === value) || null}
        onChange={(event, newValue) => onChange(newValue ? newValue.value : "")}
        options={options}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <Box sx={{ display: "flex" }}>
            <TextField
              {...params}
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                },
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    {params.InputProps.endAdornment}
                  </InputAdornment>
                ),
              }}
            />
            <IconButton
              edge="end"
              sx={{
                color: isOptionSelected ? "primary.main" : "text.disabled",
                padding: "0px 0px 0px 4px",
              }}
              onClick={handleOpenDialog}
            >
              <Icon icon="icon-park-solid:add" fontSize={38} />
            </IconButton>
          </Box>
        )}
      />

      <TeamDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSave}
      />
    </Stack>
  );
};

export default CustomIconAutocomplete;

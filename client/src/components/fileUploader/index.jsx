import React, { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Box, Typography, styled } from "@mui/material";
import ImageComponent from "../../components/imageComponent";

const StyledBox = styled(Box)(({ theme, disabled, error }) => ({
  pointerEvents: disabled ? "none" : "all",
  opacity: disabled ? 0.5 : 1,
  width: "100%",
  height: "100%",
  borderRadius: "6px",
  padding: 6,
  border: "1px solid",
  borderColor: error ? theme.palette.error.main : theme.palette.grey[300],
  ":hover": {
    borderColor: error ? theme.palette.error.dark : theme.palette.grey[700],
  },
  "& .contentWrapper": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: "3px",
    height: "100%",
    width: "100%",
    border: `1px dashed ${theme.palette.grey[300]}`,
    padding: "5px",
  },
}));

const FileUploader = ({ name, disabled, accept, control: controlProp }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      disabled={disabled}
      control={controlProp ? controlProp : control}
      render={({ field: { value, onBlur, onChange, ref }, fieldState }) => {
        return (
          <ControlledUploader
            accept={accept}
            fieldState={fieldState}
            value={value}
            onBlur={onBlur}
            disabled={disabled}
            onChange={onChange}
            ref={ref}
          />
        );
      }}
    />
  );
};

const ControlledUploader = forwardRef(
  ({ fieldState, value, onBlur, onChange, disabled, accept }, ref) => {
    const onDrop = () => {};
    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
      multiple: false,
      onDrop,
      accept,
    });

    const renderLabel = (
      <Typography textAlign="center" color="grey.400" variant="h6">
        {isDragActive
          ? "Drop here"
          : "Drag 'n' drop some files here, or click to select files"}
      </Typography>
    );

    const renderImage = <ImageComponent src={value} alt="companyLogo" />;
    return (
      <>
        <StyledBox
          error={!!fieldState.error}
          disabled={disabled}
          {...getRootProps()}
        >
          <input ref={ref} onBlur={onBlur} {...getInputProps()} />
          <Box className="contentWrapper">
            {value ? renderImage : renderLabel}
          </Box>
        </StyledBox>
        {!!true && (
          <Box>
            <Typography color="error.main" variant="caption">
              lld
              {fieldState.error?.message}
            </Typography>
          </Box>
        )}
      </>
    );
  }
);

export default FileUploader;

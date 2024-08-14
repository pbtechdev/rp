import React, { forwardRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import ImageComponent from "../../components/imageComponent";
import { kbToMb, bToMb, getFileExtention } from "./utils";
import { useMutation } from "@tanstack/react-query";
import { post } from "../../service";
import { useAuth } from "../auth";
import Iconify from "../iconify";

const StyledBox = styled(Box)(({ theme, disabled, error }) => ({
  pointerEvents: disabled ? "none" : "all",
  opacity: disabled ? 0.5 : 1,
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  padding: 6,
  border: "2px solid",
  borderColor: error ? theme.palette.error.main : theme.palette.grey[500],
  transition: "box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out",
  ":hover": {
    borderColor: error ? theme.palette.error.dark : theme.palette.primary.main,
  },
  "&:focus-within": {
    borderColor: theme.palette.primary.lighter,
  },
  "& .contentWrapper": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    height: "100%",
    width: "100%",
    borderRadius: "50%",
    border: `1px dashed ${theme.palette.grey[300]}`,
    padding: "5px",
    position: "relative",
  },
}));

const FileUploader = ({
  name,
  disabled,
  accept,
  maxsize,
  height,
  width,
  control: controlProp,
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      disabled={disabled}
      control={controlProp ? controlProp : control}
      render={({ field, fieldState }) => (
        <ControlledUploader
          height={height}
          width={width}
          {...field}
          {...fieldState}
          accept={accept}
          maxsize={maxsize}
        />
      )}
    />
  );
};

const ControlledUploader = forwardRef(
  (
    {
      error,
      value,
      onBlur,
      onChange,
      disabled,
      accept,
      name,
      maxsize,
      height,
      width,
    },
    ref
  ) => {
    console.log(value, "value");
    const { user } = useAuth();
    const { mutate } = useMutation({
      mutationFn: (data) => post("/upload-image", data),
    });
    const [showIcons, setShowIcons] = useState(false);
    const [progress, setProgress] = useState(false);
    const { setError, setValue } = useFormContext();

    const uploadImage = (file, callback) => {
      setProgress(true);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        callback(reader.result);
      };
      reader.onerror = (err) => {
        console.log("Error: ", err);
      };
    };

    const onDrop = async (droppedFiles) => {
      if (bToMb(droppedFiles[0].size) >= kbToMb(maxsize)) {
        return setError(name, {
          type: "custom",
          message: `Maximum image size allowed ${Math.round(
            kbToMb(maxsize)
          )}mb`,
        });
      }

      if (!accept.includes(getFileExtention(droppedFiles[0].name))) {
        return setError(name, {
          type: "custom",
          message: `Allowed image types ${accept}`,
        });
      }

      const submitDataBackend = (base64Image) => {
        const payload = {
          image: base64Image,
          imageName: droppedFiles[0].name?.split(".").shift(),
          userId: user._id,
        };

        mutate(payload, {
          onSuccess: (response) => {
            const { imageUrl } = response.data ?? {};
            onChange(imageUrl);
          },
          onError: (_err) => {
            setError(name, {
              type: "custom",
              message: "Image failed to upload",
            });
          },
          onSettled: () => {
            setProgress(false);
          },
        });
      };
      uploadImage(droppedFiles[0], submitDataBackend);
    };

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
      onDrop,
      accept: { "image/*": accept },
      multiple: false,
    });

    const renderLabel = (
      <Typography textAlign="center" color="grey.400" variant="h6">
        {isDragActive
          ? "Drop here"
          : "Drag 'n' drop some files here, or click to select files"}
      </Typography>
    );

    const renderImage = () => {
      if (progress) {
        return <CircularProgress />;
      }
      return (
        <Box className="imageWrapper">
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "120px",
              height: "120px",
            }}
            onMouseEnter={() => setShowIcons(true)}
            onMouseLeave={() => setShowIcons(false)}
          >
            <ImageComponent src={value} alt="companyLogo" />;
            {showIcons && (
              <Box className="imageActionWrapper">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    open();
                  }}
                  sx={{ backgroundColor: "white" }}
                >
                  <Iconify icon="mingcute:home-7-fill" />
                </IconButton>
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    setValue(name, "", {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                  sx={{ backgroundColor: "white" }}
                >
                  <Iconify icon="mingcute:home-7-fill" />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>
      );
    };

    return (
      <>
        <Box height={height} width={width}>
          <StyledBox error={!!error} disabled={disabled} {...getRootProps()}>
            <input ref={ref} onBlur={onBlur} {...getInputProps()} />
            <Box className="contentWrapper">
              {value ? renderImage() : renderLabel}
            </Box>
          </StyledBox>
        </Box>
        {!!error && (
          <Typography
            sx={{
              lineHeight: "0px",
              variant: "block",
              margin: "-4px 14px 10px 14px",
              color: "error.main",
            }}
            variant="caption"
          >
            {error?.message}
          </Typography>
        )}
      </>
    );
  }
);

export default FileUploader;

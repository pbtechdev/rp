import React, { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import {
  Box,
  CircularProgress,
  IconButton,
  styled,
  useTheme,
} from "@mui/material";
import ImageComponent from "../../components/imageComponent";
import { kbToMb, bToMb, getFileExtention } from "./utils";
import { useMutation } from "@tanstack/react-query";
import { postImage } from "../../service";
import { useAuth } from "../auth";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

const StyledBox = styled(Box)(({ theme, disabled, error }) => ({
  pointerEvents: disabled ? "none" : "all",
  opacity: disabled ? 0.5 : 1,
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  padding: 6,
  border: "2px solid",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderColor:
    error === "true" ? theme.palette.error.main : theme.palette.grey[500],
  position: "relative",
  transition: "box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out",
  ":hover": {
    borderColor:
      error === "true" ? theme.palette.error.dark : theme.palette.primary.main,
  },
  "&:focus-within": {
    borderColor: theme.palette.primary.lighter,
  },
}));

const ImageStyledBox = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px",
  border: `1px dashed ${theme.palette.grey[300]}`,
  borderRadius: "50%",
  "& .imageWrapper": {
    mixBlendMode: "multiply",
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
      maxsize,
      height,
      width,
    },
    ref
  ) => {
    const { user } = useAuth();
    const { mutate, isPending } = useMutation({
      mutationFn: (data) => postImage("/upload_image", data),
    });
    const { palette } = useTheme();

    const onDrop = async (droppedFiles) => {
      if (bToMb(droppedFiles[0].size) >= kbToMb(maxsize)) {
        return toast.error(
          `Maximum image size allowed ${Math.round(kbToMb(maxsize))}mb`
        );
      }

      if (!accept.includes(getFileExtention(droppedFiles[0].name))) {
        return toast.error(`Allowed image types ${accept}`);
      }

      const payload = new FormData();
      payload.append("userId", user._id);
      payload.append("saveAsProfile", false);
      payload.append("image", droppedFiles[0]);

      mutate(payload, {
        onSuccess: (response) => {
          const { imageUrl } = response.data ?? {};
          onChange(imageUrl);
        },
        onError: (_err) => {
          toast.error("Image failed to upload");
        },
      });
    };

    const { getRootProps, getInputProps, open } = useDropzone({
      onDrop,
      accept: { "image/*": accept },
      multiple: false,
    });

    const renderImage = (imageValue) => {
      return (
        <ImageStyledBox>
          {imageValue ? (
            <ImageComponent
              className="imageWrapper"
              src={imageValue}
              alt="Profile Pic"
            />
          ) : (
            <Icon
              style={{ color: palette.grey[300] }}
              fontSize={600}
              icon="et:profile-male"
            />
          )}
        </ImageStyledBox>
      );
    };

    const isError = !!error;

    return (
      <Box height={height} width={width}>
        <StyledBox
          error={isError?.toString()}
          disabled={disabled}
          {...getRootProps()}
        >
          {isPending ? <CircularProgress /> : renderImage(value)}
          <input ref={ref} onBlur={onBlur} {...getInputProps()} />
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              open();
            }}
            sx={{ position: "absolute", bottom: -5, right: -5 }}
          >
            <Icon
              style={{
                backgroundColor: "white",
                borderRadius: "50%",
                padding: "4px",
              }}
              icon="solar:camera-bold"
              fontSize={45}
            />
          </IconButton>
        </StyledBox>
      </Box>
    );
  }
);

export default FileUploader;

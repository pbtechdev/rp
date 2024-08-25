import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Divider,
  Stack,
} from "@mui/material";
import CustomInput from "../customInput";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomButton from "../customButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { teamValidations } from "./validations";
import { post } from "../../service";
import { useAuth } from "../auth";
import toast from "react-hot-toast";

const CreateTeamDialog = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { watch } = useFormContext();
  const [open, setOpen] = useState(false);
  const formMethods = useForm({
    defaultValues: {
      name: "",
      teamLeadName: "",
    },
    resolver: yupResolver(teamValidations),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = formMethods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({});
    }
  }, [isSubmitSuccessful]);

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => post("/create_team", data),
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      return queryClient.invalidateQueries({
        queryKey: ["GET_TEAMS"],
        refetchType: "active",
      });
    },
  });

  const onClose = () => setOpen(false);

  const linkedCompanyId =
    user?.role === "OWNER" ? user?._id : user?.linkedCompanyId;

  const handleSave = (data) => {
    const payload = {
      ...data,
      linkedCompanyId,
    };
    mutate(payload, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Box pt={1}>
      <Button
        disabled={!!watch("teamId")}
        type="button"
        onClick={() => setOpen(true)}
      >
        Add new team
      </Button>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add New Team</DialogTitle>
        <Divider />
        <FormProvider {...formMethods}>
          <form noValidate autoComplete="off">
            <DialogContent sx={{ width: { sm: 250, md: 400 } }}>
              <Stack spacing={2}>
                <CustomInput autoFocus name="name" label="Team Name" required />
                <CustomInput name="teamLeadName" label="Lead Name" />
              </Stack>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button type="button" onClick={onClose}>
                Cancel
              </Button>
              <CustomButton
                type="button"
                loading={isPending}
                onClick={handleSubmit(handleSave)}
              >
                Save
              </CustomButton>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
    </Box>
  );
};

export default CreateTeamDialog;

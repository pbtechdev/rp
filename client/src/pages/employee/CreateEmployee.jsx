import React from "react";
import EmployeeForm from "../../components/employeeForm";
import { useMutation } from "@tanstack/react-query";
import { post } from "../../service";
import { useAuth } from "../../components/auth";
import toast from "react-hot-toast";

const CreateEmployee = () => {
  const { user } = useAuth();

  const defaultValues = {
    email: "",
    employeeName: "",
    employeeId: "",
    role: "",
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => post("/register_employee", data),
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      userId: user._id,
    };
    mutate(payload, {
      onSuccess: (res) => {
        toast.success(res?.data?.message);
      },
    });
  };

  return (
    <EmployeeForm
      isPending={isPending}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
    />
  );
};

export default CreateEmployee;

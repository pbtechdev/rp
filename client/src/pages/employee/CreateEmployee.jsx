import React from "react";
import EmployeeForm from "../../components/employeeForm";
import { useMutation } from "@tanstack/react-query";
import { post } from "../../service";
import { useAuth } from "../../components/auth";
import toast from "react-hot-toast";

const CreateEmployee = () => {
  const { user } = useAuth();

  const defaultValues = {
    name: "",
    email: "",
    employeeId: "",
    teamId: "",
    role: "",
    position: "",
    totalYearsExperience: "",
    joiningDate: "",
    paymentInfo: {
      salary: "",
      variables: "",
      pan: "",
      esiNo: "",
      uan: "",
      bonus: "",
    },
    personalInfo: {
      personalEmail: "",
      mobileNumber: "",
      gender: "",
      dateOfBirth: "",
      address: "",
    },
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => post("/create_user", data),
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      linkedCompanyId:
        user?.role === "OWNER" ? user?._id : user?.linkedCompanyId,
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
      isEmployeeCreatePage
    />
  );
};

export default CreateEmployee;

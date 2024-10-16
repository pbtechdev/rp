import React from "react";
import EmployeeForm from "../../components/employeeForm";
import { useMutation } from "@tanstack/react-query";
import { post } from "../../service";
import { useAuth } from "../../components/auth";
import { useForm, FormProvider } from "react-hook-form"; 
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const CreateEmployee = () => {
  const { user } = useAuth();
  const location = useLocation(); 
  const userData = location.state || {}; 

  const formMethods = useForm({
    defaultValues: {
      name: userData.name || "",
      email: userData.email || "",
      employeeId: "",
      teamId: "",
      role: userData.role || "",
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
    },
  });

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
    <FormProvider {...formMethods}>
      <EmployeeForm
        isPending={isPending}
        onSubmit={onSubmit}
        isEmployeeCreatePage
      />
    </FormProvider>
  );
};

export default CreateEmployee;

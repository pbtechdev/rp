import React from "react";
import OnboardingForm from "../../../components/onboardingForm";
import { useMutation } from "@tanstack/react-query";
import { post } from "../../../service";
import { useAuth } from "../../../components/auth";
import toast from "react-hot-toast";

const RegisterCompany = () => {
  const { user } = useAuth();

  const defaultValues = {
    email: user.email,
    twitter: "",
    linkedIn: "",
    facebook: "",
    companyName: "",
    newPassword: "",
    contactNubmer: "",
    confirmPassword: "",
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => post("/register_company", data),
  });

  const onSubmit = (data) => {
    const { companyName, newPassword, email, confirmPassword, ...rest } = data;
    const payload = {
      name: companyName,
      password: newPassword,
      ...rest,
      userId:user._id
    };
    mutate(payload, {
      onSuccess: (res) => {
        toast.success("")
      },
    });
  };
  return (
    <OnboardingForm
      isPending={isPending}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterCompany;

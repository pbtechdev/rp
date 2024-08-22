import React from "react";
import CompanyForm from "../../components/companyForm";
import { useMutation } from "@tanstack/react-query";
import { post } from "../../service";
import { useAuth } from "../../components/auth";
import toast from "react-hot-toast";

const CreateCompany = () => {
  const { user } = useAuth();

  const defaultValues = {
    email: user.email,
    companyName: "",
    companyLogo: "",
    twitter: "",
    linkedIn: "",
    facebook: "",
    industryType: "",
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
      userId: user._id,
    };
    mutate(payload, {
      onSuccess: (res) => {
        toast.success(res?.data?.message);
      },
    });
  };
  return (
    <CompanyForm
      isPending={isPending}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
    />
  );
};

export default CreateCompany;

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
    portfolioSite: "",
    industryType: "",
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => post("/create_company", data),
    onSuccess: (res) => {
      toast.success(res?.data?.message);
    },
  });

  const onSubmit = (data) => {
    const { companyName, email, ...rest } = data;
    const payload = {
      name: companyName,
      ...rest,
      userId: user._id,
    };
    mutate(payload);
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

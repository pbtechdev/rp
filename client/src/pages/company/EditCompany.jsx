import React from "react";
import CompanyForm from "../../components/companyForm";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { get, put } from "../../service";
import toast from "react-hot-toast";

const EditCompany = () => {
  const { id } = useParams();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["GETCOMPANY"],
    queryFn: () => get(`/get_company/${id}`),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => put(`/update_company/${id}`, data),
    onSuccess: (res) => {
      toast.success(res?.data?.message);
    },
  });

  const {
    email,
    name,
    twitter,
    facebook,
    linkedIn,
    companyLogo,
    industryType,
    employeesCount,
    portfolioSite,
  } = data?.data ?? {};

  const defaultValues = {
    companyLogo: companyLogo ?? "",
    email: email,
    companyName: name,
    twitter: twitter,
    linkedIn: linkedIn,
    facebook: facebook,
    industryType: industryType,
    portfolioSite: portfolioSite,
  };

  const onSubmit = (formData) => {
    const { companyName, ...rest } = formData;
    const payload = {
      name: companyName,
      ...rest,
    };

    mutate(payload);
  };
  return (
    <CompanyForm
      employeesCount={employeesCount}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      actionName="Update"
      isPending={isPending}
      disableAction={isLoading || isFetching}
    />
  );
};

export default EditCompany;

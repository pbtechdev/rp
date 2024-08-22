import React from "react";
import OnboardingForm from "../../components/companyForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { get } from "../../service";

const EditCompany = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["GETCOMPANY"],
    queryFn: () => get(`/get_company/${id}`),
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
  } = data?.data ?? {};

  const defaultValues = {
    companyLogo: companyLogo ?? "",
    email: email ?? "",
    companyName: name,
    twitter: twitter ?? "",
    linkedIn: linkedIn ?? "",
    facebook: facebook ?? "",
    industryType: industryType ?? "",
  };

  const onSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <OnboardingForm
      employeesCount={employeesCount}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      actionName="Update"
    />
  );
};

export default EditCompany;

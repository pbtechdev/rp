import React from "react";
import OnboardingForm from "../../../components/onboardingForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { get } from "../../../service";

const CompanyProfile = () => {
  const { id } = useParams();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["GETCOMPANY"],
    queryFn: () => get(`/get_company/${id}`),
  });

  const { email, name, twitter, facebook, linkedIn, contactNubmer } =
    data?.data ?? {};

  const defaultValues = {
    email: email,
    twitter: twitter,
    linkedIn: linkedIn,
    facebook: facebook,
    companyName: name,
    newPassword: "",
    contactNubmer: contactNubmer,
    confirmPassword: "",
  };

  const onSubmit = (formData) => {};
  return <OnboardingForm defaultValues={defaultValues} onSubmit={onSubmit} />;
};

export default CompanyProfile;

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
  const onSubmit = (data) => {};
  return <OnboardingForm defaultValues={{}} onSubmit={onSubmit} />;
};

export default CompanyProfile;

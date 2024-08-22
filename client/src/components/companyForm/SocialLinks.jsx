import React from "react";
import { Stack } from "@mui/material";
import { Icon } from "@iconify/react";
import { useWatch } from "react-hook-form";

const SocialLinks = () => {
  const formValue = useWatch();
  return (
    <Stack spacing={2} direction="row" sx={{ p: 2, justifyContent: "center" }}>
      <a target="_blank" href={formValue.linkedIn}>
        <Icon icon="devicon:linkedin" fontSize={24} />
      </a>
      <a target="_blank" href={formValue.facebook}>
        <Icon icon="devicon:facebook" fontSize={24} />
      </a>
      <a target="_blank" href={formValue.twitter}>
        <Icon icon="skill-icons:twitter" fontSize={24} />
      </a>
      <a target="_blank" href={formValue.portfolioSite}>
        <Icon icon="noto:globe-with-meridians" fontSize={24} />
      </a>
    </Stack>
  );
};

export default SocialLinks;

import { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import Nav from "./nav";
import Main from "./main-content";
import Header from "./header";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const data = localStorage.getItem("current_user");
      if (!data) {
        navigate("/company-onboarding-form");
      }
    };
    checkToken();
  }, []);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </>
  );
}

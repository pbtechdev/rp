import React, { Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";

import DashboardLayout from "../layout";
import { Loader } from "../components/fallbackUi";
import Login from "../pages/authention/Login";
import RegisterCompany from "../pages/user/registerCompany";
import PageNotFound from "../components/pageNotFound";
import AuthProvider from "../components/auth";
import CompanyProfile from "../pages/user/companyProfile";

// ----------------------------------------------------------------------

const Router = () => {
  return useRoutes([
    {
      element: (
        <AuthProvider>
          <DashboardLayout>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </AuthProvider>
      ),
      children: [
        { element: <div style={{ height: "900px" }}>Hello</div>, index: true },
        {
          path: "company-onboarding-form",
          element: <RegisterCompany />,
        },
        {
          path: "company-profile/:id",
          element: <CompanyProfile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
};

export default Router;

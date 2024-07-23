import React, { Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";

import DashboardLayout from "../layout";
import Loader from "../components/fallback-ui/Loader";
import User from "../pages/user";
import Login from "../pages/login";
import CompanyOnboardingForm from "../pages/CompanyOnboardingForm";
import PageNotFound from "../components/pageNotFound";

// ----------------------------------------------------------------------

export default function Router() {

  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <div>Hello</div>, index: true },
        { path: "user", element: <User /> },
        {
          path: "company-onboarding-form",
          element: <CompanyOnboardingForm /> ,
        }
      ],
    },
    ,
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
}

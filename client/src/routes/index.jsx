import React, { Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";

import DashboardLayout from "../layout";
import Loader from "../components/fallback-ui/Loader";
import User from "../pages/user";
import Login from "../pages/login";
import CompanyOnboardingForm from "../pages/CompanyOnboardingForm";
import PageNotFound from "../components/pageNotFound";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import ProfileCreationPage from "../pages/ProfileCreationPage";
import AllEmployees from "../pages/AllEmployees";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </ProtectedRoute>
      ),
      children: [
        { element: <div>Hello</div>, index: true },
        { path: "user", element: <User /> },
        {
          path: "company-onboarding-form",
          element: <CompanyOnboardingForm />,
        },
        {
          path: "profile-creation-page",
          element: <ProfileCreationPage />,
        },
        {
          path: "all-employees-list",
          element: <AllEmployees />,
        },
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

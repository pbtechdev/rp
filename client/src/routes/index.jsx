import React, { Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";

import DashboardLayout from "../layout";
import { Loader } from "../components/fallbackUi";
import Login from "../pages/authention/Login";
import OnboardingForm from "../pages/user/onboardingForm";
import PageNotFound from "../components/pageNotFound";
import ProtectedRoute from "../components/auth";

// ----------------------------------------------------------------------

const Router = () => {
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
        { element: <div style={{ height: "900px" }}>Hello</div>, index: true },
        {
          path: "company-onboarding-form",
          element: <OnboardingForm />,
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

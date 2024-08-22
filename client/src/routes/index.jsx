import React, { Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";

import DashboardLayout from "../layout";
import { Loader } from "../components/fallbackUi";
import Login from "../pages/authention/Login";
import CreateCompany from "../pages/company/CreateCompany";
import PageNotFound from "../components/pageNotFound";
import AuthProvider from "../components/auth";
import EditCompany from "../pages/company/EditCompany";
import CreateEmployee from "../pages/employee/CreateEmployee";

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
          path: "create-company-profile",
          element: <CreateCompany />,
        },
        {
          path: "edit-company-profile/:id",
          element: <EditCompany />,
        },
        {
          path: "create-employee-profile",
          element: <CreateEmployee />,
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

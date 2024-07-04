import React, { Suspense, lazy } from "react";
import { Outlet, useRoutes } from "react-router-dom";

import DashboardLayout from "../layout";
import Loader from "../components/fallback-ui/Loader";

const User = lazy(() => {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove(import("../pages/user"));
    }, 100000000);
  });
});

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
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
      ],
    },
  ]);

  return routes;
}

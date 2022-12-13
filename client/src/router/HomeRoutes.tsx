import React from "react";
import { Home } from "../components/pages/Home";
import { UserManagement } from "../components/pages/UserManagement";
import { Setting } from "../components/pages/Setting";
import { Page404 } from "../components/pages/Page404";

export const homeRoutes = [
  {
    path: "/",
    exact: true,
    chidren: <Home />
  },
  {
    path: "/user_management",
    exact: false,
    chidren: <UserManagement />
  },
  {
    path: "/setting",
    exact: false,
    chidren: <Setting />
  },
  {
    path: "*",
    exact: false,
    chidren: <Page404 />
  }
];

import App from "./App.tsx";
import "./index.css";
import Dashboard from "../pages/dashboard/Dashboard.tsx";
import Category from "../pages/category/Category.tsx";
import { MonetaryItemCategory } from "../types/types.ts";
import Settings from "../pages/settings/Settings.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      {
        path: "/expenses",
        element: <Category category={MonetaryItemCategory.EXPENSE} />,
      },
      {
        path: "/income",
        element: <Category category={MonetaryItemCategory.INCOME} />,
      },
      {
        path: "/investments",
        element: <Category category={MonetaryItemCategory.INVESTMENT} />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

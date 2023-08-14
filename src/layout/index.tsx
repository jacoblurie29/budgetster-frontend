import App from "./App.tsx";
import "./index.css";
import Dashboard from "../pages/dashboard/Dashboard.tsx";
import { MonetaryItemCategory } from "../types/types.ts";
import Settings from "../pages/settings/Settings.tsx";
import Category from "../pages/category/Category.tsx";
import { store } from "../state/store/configureStore.ts";
import Accounts from "../pages/accounts/Accounts.tsx";
import Home from "../pages/home/Home.tsx";

import { apolloClient } from "../util/api/request.util.ts";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/accounts",
    element: <Accounts />,
  },
  {
    path: "/dashboard",
    element: (
      <App>
        <Dashboard />
      </App>
    ),
  },
  {
    path: "/expenses",
    element: (
      <App>
        <Category category={MonetaryItemCategory.EXPENSE} />
      </App>
    ),
  },
  {
    path: "/income",
    element: (
      <App>
        <Category category={MonetaryItemCategory.INCOME} />
      </App>
    ),
  },
  {
    path: "/investments",
    element: (
      <App>
        <Category category={MonetaryItemCategory.INVESTMENT} />
      </App>
    ),
  },
  {
    path: "/settings",
    element: (
      <App>
        <Settings />
      </App>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);

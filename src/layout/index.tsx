import App from "./App.tsx";
import "./index.css";
import Dashboard from "../pages/dashboard/Dashboard.tsx";
import { MonetaryItemCategory } from "../types/types.ts";
import Settings from "../pages/settings/Settings.tsx";
import Category from "../pages/category/Category.tsx";
import { store } from "../state/configureStore.ts";
import Accounts from "../pages/accounts/Accounts.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Provider } from "react-redux";

const apolloClient = new ApolloClient({
  uri: "http://127.0.0.1:4010",
  cache: new InMemoryCache(),
});

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
  {
    path: "/accounts",
    element: <Accounts />,
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

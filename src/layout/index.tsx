import App from "./App.tsx";
import "./index.css";
import Dashboard from "../pages/dashboard/Dashboard.tsx";
import { MonetaryItemCategory } from "../types/types.ts";
import Settings from "../pages/settings/Settings.tsx";
import Category from "../pages/category/Category.tsx";
import { store } from "../state/store/configureStore.ts";
import Accounts from "../pages/accounts/Accounts.tsx";
import { RefreshTokenQuery } from "../graphql/Auth.gql.ts";
import {
  deleteCookie,
  getCookie,
  setCookie,
} from "../util/api/request.util.ts";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { Provider } from "react-redux";

import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

import { GraphQLError } from "graphql";
import type { FetchResult } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://127.0.0.1:4010",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("authToken");

  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions.code === "USER_NOT_AUTHENTICATED") {
          // ignore for a refresh request to prevent infinite loop
          if (operation.operationName === "RefreshToken") return;

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const observable = new Observable<FetchResult<Record<string, any>>>(
            (observer) => {
              // used an anonymous function for using an async function
              (async () => {
                try {
                  // Request a new access token from the server
                  const accessToken = await refreshToken();

                  // Throw an error if the access token is empty
                  if (!accessToken) {
                    throw new GraphQLError("Empty AccessToken", {
                      extensions: {
                        code: "EMPTY_ACCESS_TOKEN",
                      },
                    });
                  }

                  // Retry the failed request
                  const subscriber = {
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                  };

                  forward(operation).subscribe(subscriber);
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (err: any) {
                  if (err.extensions.code === "EMPTY_ACCESS_TOKEN") {
                    // TODO: This is unsafe from XSS attacks and some other attacks, so we need to find a better way to do this.
                    window.location.href = "/accounts";
                    // This below is the react router way of doing it, but it doesn't work for some reason.
                    // history.push("/accounts");
                  } else {
                    observer.error(err);
                  }
                }
              })();
            }
          );

          return observable;
        }
      }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
);

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

// Request a refresh token to then stores and returns the accessToken.
const refreshToken = async () => {
  try {
    // Get the refresh token from the cookie
    const cookieValue = getCookie("refreshToken");

    // Attempt to get a new access token
    const refreshResolverResponse = await client.query({
      query: RefreshTokenQuery,
      variables: {
        refreshTokenInput: {
          refreshToken: cookieValue,
        },
      },
    });

    // Get the refresh token and auth token from the response
    const refreshToken =
      refreshResolverResponse.data?.refreshToken.refreshToken;
    const authToken = refreshResolverResponse.data?.refreshToken.authToken;

    // Store the refresh token and auth token in local storage and cookies
    setCookie("refreshToken", refreshToken || "", 30);
    localStorage.setItem("authToken", authToken || "");

    return refreshToken;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Clear local storage and cookies
    localStorage.clear();
    deleteCookie("refreshToken");

    console.log("❌ [API]: ", error);
  }
};

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
    <ApolloProvider client={client}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);

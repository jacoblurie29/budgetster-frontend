import { refreshToken } from "./request.util";
import { createHttpLink, Observable } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { GraphQLError } from "graphql";
import type { FetchResult } from "@apollo/client";

export const httpLink = createHttpLink({
  uri: "https://budgetster.fly.dev",
});

export const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("authToken");

  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    },
  };
});

export const errorLink = onError(
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
                    window.location.href = "/";
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

import { errorLink, authLink, httpLink } from "./links";
import { RefreshTokenQuery } from "../../graphql/Auth.gql";
import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";

/**
 * Apollo client for making GraphQL requests.
 */
export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

/**
 * Request a refresh token to then stores and returns the accessToken.
 */
export const refreshToken = async () => {
  try {
    // Get the refresh token from the cookie
    const cookieValue = getCookie("refreshToken");

    // Attempt to get a new access token
    const refreshResolverResponse = await apolloClient.query({
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

/**
 * setCookie - set cookie in browser with name, value and expiration days
 *
 * @param name the name of the cookie to retrieve its value
 * @param value the value of the cookie
 * @param expDays the number of days the cookie will be valid
 */
export const setCookie = (name: string, value: string, expDays: number) => {
  const d = new Date();
  d.setTime(d.getTime() + expDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

/**
 * getCookie - get cookie value from browser by name
 *
 * @param cname the name of the cookie to retrieve its value
 */
export const getCookie = (cname: string) => {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

/**
 * deleteCookie - delete cookie from browser by setting expiration date to past
 *
 * @param name the name of the cookie to delete
 */
export const deleteCookie = (name: string) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

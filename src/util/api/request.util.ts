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

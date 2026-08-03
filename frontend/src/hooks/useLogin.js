/** TAC SERVICE BOOKING APP - CUSTOM REACT HOOK FOR USER LOGIN **/

import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [loginError, setLoginError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (loginCredentials) => {
    const { rememberMe, ...loginCredentialsToSend } = loginCredentials;
    setLoginError(null);

    try {
      const response = await fetch("https://mechmate.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginCredentialsToSend),
      });

      const json = await response.json();

      if (!response.ok) {
        console.log(json.error);
        setLoginError(json.error);
      }

      if (response.ok) {
        if (rememberMe) {
          // If "rememberMe" is checked - save the relevant user details to local storage when the user is logged into to their account.
          localStorage.setItem("user", JSON.stringify(json));
        } else {
          // If "Remember Me" is not checked, remove the preference from localStorage
          localStorage.removeItem("user");
        }

        // update the auth context global state.
        dispatch({ type: "LOGIN", payload: json });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return { login, loginError };
};

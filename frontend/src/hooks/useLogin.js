
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
      const response = await fetch(
        "https://mechmate.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginCredentialsToSend),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        console.log(json.error);
        setLoginError(json.error);
        return;
      }

      if (response.ok) {

        // Save user details and token in localStorage
        localStorage.setItem("user", JSON.stringify(json));

        // Update Auth Context state
        dispatch({
          type: "LOGIN",
          payload: json,
        });
      }

    } catch (error) {
      console.log("Login Error:", error);
      setLoginError("Something went wrong. Please try again.");
    }
  };

  return { login, loginError };
};
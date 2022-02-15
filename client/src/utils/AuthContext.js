import React, { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    isAuth: false,
    user: null,
  });
  const history = useNavigate();
  const getData = async () => {
    Axios.get("http://localhost:8080/users/status", {
      withCredentials: true,
    })
      .then((response) => {
        console.log(response);

        if (response.data.message) {
          console.log("Not authenticated, redirecting!");
          history("/");
          return;
        }
        setState({ user: response.data.user, isAuth: true });
      })
      .catch((error) => {
        console.log(error);
        history("/");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AuthContext.Provider value={{ state, setState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthState = () => {
  return useContext(AuthContext);
};

export const useAuth = () => {
  const register = async (
    firstName,
    lastName,
    username,
    password,
    phoneNumber,
    history,
  ) => {
    try {
      if (!firstName || !lastName || !username || !phoneNumber || !password) {
        alert("Missing fields!");
      }

      const newUser = {
        firstName,
        lastName,
        username: username.toLowerCase(),
        password: password,
        phoneNumber,
        verified: false,
        joinedAt: new Date(),
      };

      Axios.post("http://localhost:8080/users/register", newUser)
        .then((response) => {
          console.log(response);

          history("/login");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async (username, password, history, setState) => {
    if (!username || !password) {
      alert("Missing fields!");
    }

    Axios.post(
      "http://localhost:8080/users/login",
      {
        username,
        password,
      },
      { withCredentials: true },
    )
      .then((response) => {
        console.log(response);
        setState({ user: response.data.passport.user, isAuth: true });
        history("/posts");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const logout = async (history, setState) => {
    Axios.post("http://localhost:8080/users/logout", {
      withCredentials: true,
    })
      .then((response) => {
        console.log(response);

        setState({ user: null, isAuth: false });
        history("/");
      })
      .catch((error) => {
        console.log(error.message);
        history("/");
      });
  };

  return { register, login, logout };
};

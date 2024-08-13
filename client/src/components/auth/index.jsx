import { useMutation } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../service";
import { getItem, setItem } from "../../utils/apputils";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getItem("user"));
  const [token, setToken] = useState(getItem("token"));
  const navigage = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => post("/log_in", data),
  });

  const onSuccess = (res) => {
    if (res.status === 200) {
      setItem("token", res.data?.token);
      setUser(res.data?.token);
      setItem("user", res.data?.user);
      setToken(res.data?.user);
      navigage("/");
    }
  };

  const logIn = (data) => mutate(data, { onSuccess });

  const logOut = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ token, isPending, user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

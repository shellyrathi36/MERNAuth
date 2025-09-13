import { createContext, useState } from "react";
import { data } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getUserData = async (req, res) => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");

      data.success ? setUserData(data.userData) : toast.error(data.message);
      //   console.log(userData);
    } catch (error) {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    userData,
    setIsLoggedin,
    setUserData,
    getUserData,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

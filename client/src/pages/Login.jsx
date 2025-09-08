import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          navigate("/");
          getUserData();
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 ">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      ></img>
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account " : "Login"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign Up"
            ? "Create Your Account "
            : "Login to your Account "}
        </p>
        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt=""></img>
              <input
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent outline-none"
                typle="text"
                value={name}
                placeholder="Your Name"
                required
              ></input>
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt=""></img>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none"
              typle="text"
              value={email}
              placeholder="Your Email ID"
              required
            ></input>
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt=""></img>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none"
              typle="password"
              placeholder="Your Password"
              required
            ></input>
          </div>
          <p
            onClick={() => navigate("/reset-password")}
            className=" text-gray-200 mb-4 cursor-pointer"
          >
            Forgot Password ?
          </p>
          <button className="w-full py-2.5 rounded-full text-white font-medium bg-gradient-to-r from bg-indigo-500 to-indigo-900">
            {state}
          </button>
        </form>
        {state === "Sign Up" ? (
          <p className="text-gray-200 text-center text-sm mt-4">
            Aready have an Account? {}
            <span
              onClick={() => setState("Login")}
              className="text-blue-300 cursor-pointer underline"
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-gray-200 text-center text-sm mt-4">
            Don't have an Account? {}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-300 cursor-pointer underline"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;

import express from "express";
import {
  isAuthenticated,
  login,
  logout,
  register,
  resetPassword,
  sendResetOtp,
  sendVerifyOtp,
  verifyEmail,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";
const authRouter = express.Router();

authRouter.post("/register", register);
//whenver we hit /regiter it will excuete the register controller function...

authRouter.post("/login", login); // whenever we hit /login api endpoint it will excuete the login controller function
authRouter.post("/logout", logout);

// whenever we hit /logout it will exceuete the logout controller funtion...
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);

authRouter.post("/verify-account", verifyEmail);

authRouter.post("/is-auth", userAuth, isAuthenticated);

authRouter.post("/send-reset-otp", sendResetOtp);

authRouter.post("/reset-password", resetPassword);
export default authRouter;

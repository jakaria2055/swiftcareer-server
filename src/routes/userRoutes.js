import express from "express";
import {
  updateProfile,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/userController.js";
import authToken from "../middleware/userAuth.js";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/logout", userLogout);
userRouter.post("/update/profile", authToken, updateProfile);

export default userRouter;

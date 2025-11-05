import express from "express";
import {
  updateProfile,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/userController.js";
import authToken from "../middleware/userAuth.js";
import { singleUpload } from "../middleware/multer.js";
import upload from "../../utils/multer.js";

const userRouter = express.Router();

userRouter.post("/register",singleUpload, userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/logout", userLogout);
userRouter.post("/update/profile", authToken, upload.single('file'), updateProfile);

export default userRouter;

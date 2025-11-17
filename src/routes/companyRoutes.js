import express from "express";
import authToken from "../middleware/userAuth.js";
import { getAllCompanies, getAllRegisterCompanies, getCompanyById, registerCompany, updateCompany } from "../controllers/companyController.js";
import { singleUpload } from "../middleware/multer.js";

const companyRouter = express.Router();

companyRouter.post("/register",authToken, registerCompany);
companyRouter.get("/get",authToken, getAllCompanies);
companyRouter.get("/getAllCompanies",authToken, getAllRegisterCompanies);
companyRouter.get("/get/:id",authToken, getCompanyById);
companyRouter.put("/update/:id", authToken, singleUpload, updateCompany);

export default companyRouter;

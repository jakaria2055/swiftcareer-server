import express from "express";
import authToken from "../middleware/userAuth.js";
import { getAllCompanies, getCompanyById, registerCompany, updateCompany } from "../controllers/companyController.js";

const companyRouter = express.Router();

companyRouter.post("/register",authToken, registerCompany);
companyRouter.get("/get",authToken, getAllCompanies);
companyRouter.get("/get/:id",authToken, getCompanyById);
companyRouter.put("/update/:id", authToken, updateCompany);

export default companyRouter;

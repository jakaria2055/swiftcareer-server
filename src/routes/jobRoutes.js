import express from "express";
import authToken from "../middleware/userAuth.js";
import { getAdminJobs, getAllJobs, getJobByCompany, getJobById, postJob } from "../controllers/jobController.js";

const jobRouter = express.Router();

jobRouter.post("/post",authToken, postJob);
jobRouter.get("/get",authToken, getAllJobs);
jobRouter.get("/getadminjobs",authToken, getAdminJobs);
jobRouter.get("/getCompanyJob/:id",authToken, getJobByCompany);
jobRouter.get("/get/:id", authToken, getJobById);

export default jobRouter;

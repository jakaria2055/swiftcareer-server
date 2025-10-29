import express from "express";
import authToken from "../middleware/userAuth.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/applicationController.js";

const applicationRouter = express.Router();

applicationRouter.get("/apply/:id", authToken, applyJob);
applicationRouter.get("/get", authToken, getAppliedJobs);
applicationRouter.get("/:id/applicants", authToken, getApplicants);
applicationRouter.post("/status/:id/update", authToken, updateStatus);

export default applicationRouter;

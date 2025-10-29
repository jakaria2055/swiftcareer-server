import { Application } from "../models/applicationModel.js";
import { Job } from "../models/jobModel.js";

/*****************Created Application******************* */
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res
        .status(400)
        .json({ message: "Invalid job id", success: false });
    }

    //check the user already applied or not
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "User Already applied for this post",
        success: false,
      });
    }

    //check job is exist or not
    const job = await Job.findById( jobId );
    if (!job) {
      return res.status(400).json({
        message: "Job not found.",
        success: false,
      });
    }

    //Apply for job
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res
      .status(200)
      .json({ message: "Application Submitted", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Application Server Error", success: false });
  }
};

/*****************get applied Jobs******************* */
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company", options: { sort: { createdAt: -1 } } },
      });

    if (!applications) {
      return res
        .status(400)
        .json({ message: "No Application Found.", success: false });
    }

    return res.status(200).json({ applications, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Get Application found server error", success: false });
  }
};

/*****************get Applicants******************* */
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant", options: { sort: { createdAt: -1 } } },
    });

    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found.", success: false });
    }

    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Get Applicant server error", success: false });
  }
};

/*****************Update Status******************* */
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res
        .status(400)
        .json({ message: "Invalid Status", success: false });
    }

    //Find Application by Application ID
    const application = await Application.findById({ _id: applicationId });
    if (!application) {
      return res
        .status(400)
        .json({ message: "Application Not Found", success: false });
    }

    //Update Status
    application.status = status.toLowerCase();
    await application.save();

    return res
      .status(200)
      .json({ message: "Application Status Updated.", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Applicant Status server error", success: false });
  }
};

import { Job } from "../models/jobModel.js";


/*****************Crteated Job******************* */
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position,
      companyId,
      experience,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !location ||
      !salary ||
      !jobType ||
      !companyId ||
      !position ||
      !experience
    ) {
      return res
        .status(400)
        .json({ message: " Fill All The Fields.", status: false });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      position,
      company: companyId,
      experienceLevel: experience,
      created_by: userId,
    });

    return res
      .status(201)
      .json({ message: "Job created successfully.", status: true, job });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Job Post server error", status: false });
  }
};

/*****************Get All Job******************* */
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query).populate({
        path: "company", 
    }).sort({createdAt: -1});
    if (!jobs) {
      return res.status(404).json({ message: "No Jobs Found.", status: false });
    }

    return res.status(200).json({ jobs, status: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Find Job Post server error", status: false });
  }
};

/*****************User Get Job by ID******************* */
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate("company").populate({
      path: "applications",
    });
    
    if (!job) {
      return res
        .status(404)
        .json({ message: "Job Not Found.", status: false });
    }

    return res.status(200).json({ job, status: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Find Job Post server error", status: false });
  }
};




/*****************Find admin created job******************* */
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs) {
      return res.status(404).json({ message: "No Jobs Found.", status: false });
    }

    return res.status(200).json({ jobs, status: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Find Admin Job Post server error", status: false });
  }
};

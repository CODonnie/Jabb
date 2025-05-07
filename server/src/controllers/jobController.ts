import { Request, Response } from "express";
import Job from "../models/jobModel";
import sanitizeJobPayload from "../utils/jobDTO";

//@desc - create Job
//@route - POST/api/job/create
//@access - admin & employer
export const createJob = async (req: Request, res: Response) => {
  try {
    const userRole = (req as any).user?.role;
    const userId = (req as any).user?.id;

    const permitted = userRole === "admin" || userRole === "employer";
    if (!permitted) {
      res.status(403).json({
        status: false,
        message: "access denied - admin / employer priviledges required",
      });
      return;
    }

    const job = new Job({
      ...sanitizeJobPayload(req.body),
      postedBy: userId,
      employer: userId,
    });
    await job.save();

    res.status(200).json({ status: true, message: "job created" });
  } catch (error) {
    console.log("job creation error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc - Display all jobs
//@route - GET/api/jobs
export const getJobs = async (req: Request, res: Response) => {
  try {
    const {
      search,
      tags,
      type,
      location,
      status,
      sortBy,
      sortOrder,
      page = 1,
      limit = 5,
    } = req.query;

    //FILTERS
    const query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (tags) {
      const allTags = Array.isArray(tags)
        ? tags
        : String(tags)
            .split(",")
            .map((tag) => tag.trim());

      query.tags = { $in: allTags };
    }

    if (type) query.type = type;
    if (location) query.location = { $regex: location, $options: "i" };
    if (status) query.status = status;

    //SORT
    const sortOptions: any = {};

    if (sortBy) {
      sortOptions[String(sortBy)] = sortOrder === "asc" ? 1 : -1;
    } else {
      sortOptions.createdAt = -1;
    }

    //PAGINATION
    const pageNumber = Number(page) || 1;
    const pageSize = Number(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const jobs = await Job.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const totalJobs = await Job.countDocuments(query);
    const totalPages = Math.ceil(totalJobs / pageSize);

    if (!jobs || jobs.length === 0) {
      res.status(404).json({ status: false, message: "jobs not found" });
      return;
    }

    res
      .status(200)
      .json({
        status: true,
        totalJobs,
        totalPages,
        currentPage: pageNumber,
        jobs,
      });
  } catch (error) {
    console.log("job retrieval error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc - Display a job
//@route - GET/api/jobs/:id
export const getAJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const jab = await Job.findById(id).populate(
      "employer",
      "firstName lastName"
    );
    if (!jab) {
      res.status(404).json({ status: false, message: "job not found" });
      return;
    }

    res.status(200).json({ status: true, jab });
  } catch (error) {
    console.log("job retrival error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc - update job info
//@route - POST/api/job/update/:id
export const updateJob = async (req: Request, res: Response) => {
  try {
    const updata = req.body;
    const jobId = req.params.id;
    const user = (req as any).user;
    const isAdmin = user?.role === "admin";
    let jab = await Job.findById(jobId);
    if (!jab) {
      res.status(404).json({ status: false, message: "job not found" });
      return;
    }
    const isOwner = user?.id.toString() === jab.postedBy.toString();

    if (!isOwner && !isAdmin) {
      res.status(403).json({ status: false, message: "Unauthorized access" });
      return;
    }

    const updatedJob = await Job.findByIdAndUpdate(jobId, updata, {
      new: true,
      runValidators: true,
    });

    res
      .status(200)
      .json({ status: true, message: "job info updated", job: updatedJob });
  } catch (error) {
    console.log("job update error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc - delete job
//@route - DELETE/api/job/delete/:id
export const deleteJob = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.id;
    const user = (req as any).user;
    const isAdmin = user?.role === "admin";
    let jab = await Job.findById(jobId);
    if (!jab) {
      res.status(404).json({ status: false, message: "job not found" });
      return;
    }
    const isOwner = user?.id.toString() === jab.postedBy.toString();

    if (!isOwner && !isAdmin) {
      res.status(403).json({ status: false, message: "Unauthorized access" });
      return;
    }

    await Job.findByIdAndDelete(jobId);

    res.status(200).json({ status: true, message: "job deleted" });
  } catch (error) {
    console.log("job deletion error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

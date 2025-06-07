import { Request, Response } from "express";
import User from "../models/userModel";
import Job from "../models/jobModel";
import JobApp from "../models/jobAppModel";

//@desc - Get all Users
//@route - GET /api/admin/user
//@access - private: admin
export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");

    if (!users || users.length === 0) {
      res.status(404).json({ status: false, message: "no user found" });
      return;
    }

    res.status(200).json({ status: true, users });
  } catch (error) {
    console.log("retrieving all user error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc - get a user profile
//@route - GET /api/admin/user/:id
//@access - private: admin
export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(404).json({ status: false, message: "no user found" });
      return;
    }

    res.status(200).json({ status: true, user });
  } catch (error) {
    console.log("retrieving all user error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc - delete user profile
//@route - DELETE /api/admin/user/:id
//@access - private: admin
export const removeUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(404).json({ status: false, message: "no user found" });
      return;
    }

    await Job.deleteMany({ postedBy: userId });
    await JobApp.deleteMany({ applicant: userId });

    res.status(200).json({ status: true, message: "user deleted" });
  } catch (error) {
    console.log("deleting user error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc - Get all jobs
//@route - GET /api/admin/job
//@access - private: admin
export const getAllJob = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find().populate(
      "postedBy",
      "firstName lastName email"
    );

    if (!jobs || jobs.length === 0) {
      res.status(404).json({ status: false, message: "no job found" });
      return;
    }

    res.status(200).json({ status: true, jobs });
  } catch (error) {
    console.log("retrieving all job error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc - get a job post
//@route - GET /api/admin/job/:id
//@access - private: admin
export const getJob = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate(
      "postedBy",
      "firstName lastNameemail"
    );
    if (!job) {
      res.status(404).json({ status: false, message: "no job found" });
      return;
    }

    res.status(200).json({ status: true, job });
  } catch (error) {
    console.log("retrieving job error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc - delete job profile
//@route - DELETE /api/admin/job/:id
//@access - private: admin
export const removeJob = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.id;

    const deletedJob = await Job.findByIdAndDelete(jobId);
    if (!deletedJob) {
      res.status(404).json({ status: false, message: "no job found" });
      return;
    }

    res.status(200).json({ status: true, message: "job deleted" });
  } catch (error) {
    console.log("deleting job error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

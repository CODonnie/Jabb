import { Request, Response } from "express";
import JobApp from "../models/jobAppModel";

//@desc - route for users to apply for jobs
//@route - POST/api/apply/:id
export const jobApplication = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.id;
    const userId = (req as any).user?.id;

    const alreadyApplied = await JobApp.findOne({
      job: jobId,
      applicant: userId,
    });

    if (alreadyApplied) {
      res
        .status(400)
        .json({ status: false, message: "User already applied to this job" });
      return;
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const resume = files?.resume?.[0]?.path;
    const coverLetter = files?.coverLetter?.[0]?.path;

    const application = await JobApp.create({
      job: jobId,
      applicant: userId,
      coverLetter,
      resumeUrl: resume,
    });

    res.status(200).json({ status: true, application });
  } catch (error) {
    console.log("job application error", error);
    res.status(500).json({ message: "interal server error" });
  }
};

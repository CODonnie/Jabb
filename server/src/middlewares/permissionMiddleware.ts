import { Request, Response, NextFunction } from "express";
import Job from "../models/jobModel";

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ message: "Unauthorised access" });
      return;
    }

    next();
  };
};

export const permit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;
  const jobId = req.params.id;

  const job = await Job.findById(jobId);
  if (job.postedBy.toString() !== user.id.toString() && user.role !== "admin") {
    res.status(403).json({ message: "Unauthorised access" });
    return;
  }

  next();
};

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
<<<<<<< HEAD
  const user = (req as any).user;
  if (!user || user.role !== "admin") {
    res.status(403).json({ message: "Unauthorised access" });
    return;
  }

  next();
}
=======
	const user = (req as any).user;
	if (!user && user.role !== "admin") {
		res.status(403).json({ message: "Unauthorised access - admin only" });
		return;
	};

	next();
}
>>>>>>> bfb14c3fe68cbc9f297b459512b7b2f1f2b3f90d

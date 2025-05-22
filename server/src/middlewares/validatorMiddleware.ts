import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ status: false, errors: errors.array() });
    return;
  }

  next();
};

export const ValidateJobFiles = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  if (!files || !files.resume || files.resume.length === 0) {
    res.status(400).json({ status: false, message: "Resume file is required" });
  }

  next();
};

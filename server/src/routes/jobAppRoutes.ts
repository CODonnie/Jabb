import express from "express";
import { jobApplication } from "../controllers/jobAppController";
import protect from "../middlewares/authMiddleware";
import { upload } from "../utils/fileUploadsUtils";
import { validateRequest, ValidateJobFiles } from "../middlewares/validatorMiddleware";
import { validateJobApp } from "../validators/jobAppValidator";

const jobAppRoutes = express.Router();

jobAppRoutes.post(
  "/apply/:id",
  protect,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "coverLetter", maxCount: 1 },
  ]),
	validateJobApp,
	validateRequest,
	ValidateJobFiles,
  jobApplication
);

export default jobAppRoutes;

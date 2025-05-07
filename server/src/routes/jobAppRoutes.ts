import express from "express";
import { jobApplication } from "../controllers/jobAppController";
import protect from "../middlewares/authMiddleware";
import { upload } from "../utils/fileUploadsUtils";

const jobAppRoutes = express.Router();

jobAppRoutes.post(
  "/apply/:id",
  protect,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "coverLetter", maxCount: 1 },
  ]),
  jobApplication
);

export default jobAppRoutes;

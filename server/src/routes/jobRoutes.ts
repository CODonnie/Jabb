import express from "express";
import protect from "../middlewares/authMiddleware";
import {createJob, deleteJob, getAJob, getJobs, updateJob} from "../controllers/jobControllers";
import {authorize, permit} from "../middlewares/permissionMiddleware";

const jobRoutes = express.Router();

jobRoutes.post("/", protect, authorize("admin", "employer"), createJob);
jobRoutes.get("/", protect, getJobs);
jobRoutes.get("/:id", protect, getAJob);
jobRoutes.put("/:id", protect, permit, updateJob);
jobRoutes.delete("/:id", protect, permit, deleteJob);

export default jobRoutes;

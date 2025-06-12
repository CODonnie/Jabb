import express from "express";
import protect from "../middlewares/authMiddleware";
import {createJob, deleteJob, getAJob, getJobs, updateJob} from "../controllers/jobController";
import {authorize, permit} from "../middlewares/permissionMiddleware";

const jobRoutes = express.Router();

jobRoutes.post("/", protect, authorize("admin", "employer"), createJob);
jobRoutes.get("/", getJobs);
jobRoutes.get("/:id", getAJob);
jobRoutes.put("/:id", protect, permit, updateJob);
jobRoutes.delete("/:id", protect, permit, deleteJob);

export default jobRoutes;

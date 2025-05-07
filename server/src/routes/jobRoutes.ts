import express from "express";
import protect from "../middlewares/authMiddleware";
import {createJob, deleteJob, getAJob, getJobs, updateJob} from "../controllers/jobController";

const jobRoutes = express.Router();

jobRoutes.post("/", protect, createJob);
jobRoutes.get("/", protect, getJobs);
jobRoutes.get("/:id", protect, getAJob);
jobRoutes.put("/:id", protect, updateJob);
jobRoutes.delete("/:id", protect, deleteJob);

export default jobRoutes;

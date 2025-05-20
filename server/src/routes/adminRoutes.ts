import express from "express";
import {
  getAllJob,
  getAllUser,
  getJob,
  getUser,
  removeJob,
  removeUser,
} from "../controllers/adminController";
import protect from "../middlewares/authMiddleware";
import { adminOnly } from "../middlewares/permissionMiddleware";

const adminRoute = express.Router();

adminRoute.get("/user", protect, adminOnly, getAllUser);
adminRoute.get("/user/:id", protect, adminOnly, getUser);
adminRoute.delete("/user/:id", protect, adminOnly, removeUser);
adminRoute.get("/job", protect, adminOnly, getAllJob);
adminRoute.get("/job/:id", protect, adminOnly, getJob);
adminRoute.delete("/job/:id", protect, adminOnly, removeJob);

export default adminRoute;

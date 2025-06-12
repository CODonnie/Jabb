// src/app.ts
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./middlewares/errorMiddleware";
import authRouter from "./routes/authRoutes";
import jobRoutes from "./routes/jobRoutes";
import jobAppRoutes from "./routes/jobAppRoutes";
import adminRoute from "./routes/adminRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/jobs", jobRoutes);
app.use("/api", jobAppRoutes);
app.use("/api/admin", adminRoute);

app.use(notFound);
app.use(errorHandler);

export default app;
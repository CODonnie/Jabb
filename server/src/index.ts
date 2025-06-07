import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import DBConnect from "./config/db";
import { errorHandler, notFound } from "./middlewares/errorMiddleware";
import authRouter from "./routes/authRoutes";
import jobRoutes from "./routes/jobRoutes";
import jobAppRoutes from "./routes/jobAppRoutes";
import adminRoute from "./routes/adminRoutes";

//init
dotenv.config();
const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/auth", authRouter);
app.use("/api/jobs", jobRoutes);
app.use("/api", jobAppRoutes);
app.use("/api/admin", adminRoute);

//error middleware
app.use(notFound);
app.use(errorHandler);

//server
if (process.env.NODE_ENV !== "test") {
    const port = process.env.PORT || 5002;
    DBConnect().then(() => {
        app.listen(port, () => console.log(`Jabb server running on http://localhost:${port}`));
    })
}

export { app } 

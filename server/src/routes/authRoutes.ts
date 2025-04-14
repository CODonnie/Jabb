import { Router } from "express";
import { login, logout, signup } from "../controllers/authController";
import protect from "../middlewares/authMiddleware";

const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.get('/logout', protect, logout);

export default authRouter;

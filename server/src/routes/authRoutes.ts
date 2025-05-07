import { Router } from "express";
import { getUsers, login, logout, signup } from "../controllers/authController";
import protect from "../middlewares/authMiddleware";

const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.get('/logout', protect, logout);
authRouter.get('/users', getUsers);

export default authRouter;

import { Router } from "express";
import { getUserProfile, getUsers, login, logout, signup, updateUserInfo } from "../controllers/authController";
import protect from "../middlewares/authMiddleware";

const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.get('/logout', protect, logout);
authRouter.get('/users', getUsers);
authRouter.get('/user/:id', protect, getUserProfile);
authRouter.put('/user/:id', protect, updateUserInfo);

export default authRouter;

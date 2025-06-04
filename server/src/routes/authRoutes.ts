import { Router } from "express";
import { deleteUserProfile, getUserProfile, getUsers, login, logout, signup, updateUserInfo } from "../controllers/authController";
import protect from "../middlewares/authMiddleware";

const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.get('/logout', protect, logout);
authRouter.get('/users', getUsers);
authRouter.get('/me', protect, getUserProfile);
authRouter.put('/me', protect, updateUserInfo);
authRouter.delete('/me', protect, deleteUserProfile);

export default authRouter;

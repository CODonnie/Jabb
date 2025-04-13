import { Router } from "express";
import { login, logout, signup } from "../controllers/authController"

const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.get('/logout', logout);

export default authRouter;
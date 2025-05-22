import { Router } from "express";
import { getUserProfile, getUsers, login, logout, signup, updateUserInfo } from "../controllers/authController";
import protect from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validatorMiddleware";
import { signupValidator, loginValidator, updateValidator } from "../validators/authValidator";

const authRouter = Router();

authRouter.post('/signup', signupValidator, validateRequest, signup);
authRouter.post('/login', loginValidator, validateRequest, login);
authRouter.get('/logout', protect, logout);
authRouter.get('/users', getUsers);
authRouter.get('/me', protect, getUserProfile);
authRouter.put('/me', protect, updateValidator, validateRequest, updateUserInfo);

export default authRouter;

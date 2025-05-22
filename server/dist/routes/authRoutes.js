"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const validatorMiddleware_1 = require("../middlewares/validatorMiddleware");
const authValidator_1 = require("../validators/authValidator");
const authRouter = (0, express_1.Router)();
authRouter.post('/signup', authValidator_1.signupValidator, validatorMiddleware_1.validateRequest, authController_1.signup);
authRouter.post('/login', authValidator_1.loginValidator, validatorMiddleware_1.validateRequest, authController_1.login);
authRouter.get('/logout', authMiddleware_1.default, authController_1.logout);
authRouter.get('/users', authController_1.getUsers);
authRouter.get('/me', authMiddleware_1.default, authController_1.getUserProfile);
authRouter.put('/me', authMiddleware_1.default, authValidator_1.updateValidator, validatorMiddleware_1.validateRequest, authController_1.updateUserInfo);
exports.default = authRouter;

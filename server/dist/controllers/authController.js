"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
//@desc - Signup User
//@route - POST/api/auth/signup
const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        let user = await userModel_1.default.findOne({ email });
        if (user) {
            res
                .status(403)
                .json({ status: false, message: `user ${email} already exist` });
            return;
        }
        user = new userModel_1.default({ firstName, lastName, email, password, role });
        await user.save();
        res.status(200).json({ status: true, user });
    }
    catch (error) {
        console.error(`signup error: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.signup = signup;
//@desc - Login User
//@route - POST/api/auth/login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ status: false, message: "user not found" });
            return;
        }
        const isMatch = await user.comparePasswords(password);
        if (!isMatch) {
            res.status(401).json({ status: false, message: "invalid credentials" });
            return;
        }
        const secret = process.env.JWT_SECRET;
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, secret, {
            expiresIn: "1d",
        });
        res.cookie("jabbToken", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 1 * 24 * 3600 * 1000,
        });
        res
            .status(200)
            .json({ status: true, message: "User logged in successfully" });
    }
    catch (error) {
        console.error(`login error: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.login = login;
//@desc - logout User
//@route - GET/api/auth/logout
const logout = (req, res) => {
    res.clearCookie("jabbToken");
    res.status(200).json({ message: "user logged out" });
};
exports.logout = logout;

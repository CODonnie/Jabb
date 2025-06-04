import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import JobApp from "../models/jobAppModel";
import Job from "../models/jobModel";

//@desc - Signup User
//@route - POST/api/auth/signup
export const signup = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      res
        .status(409)
        .json({ status: false, message: `user ${email} already exist` });
      return;
    }

    user = new User({ firstName, lastName, email, password, role });
    await user.save();
    res.status(201).json({ status: true, user });
  } catch (error) {
    console.error(`signup error: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc - Login User
//@route - POST/api/auth/login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ status: false, message: "user not found" });
      return;
    }

    const isMatch = await user.comparePasswords(password);
    if (!isMatch) {
      res.status(401).json({ status: false, message: "invalid credentials" });
      return;
    }

    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign({ id: user._id, role: user.role }, secret, {
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
      .json({ status: true, message: "User logged in successfully", user, token });
  } catch (error) {
    console.error(`login error: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc - logout User
//@route - GET/api/auth/logout
export const logout = (req: Request, res: Response) => {
  res.clearCookie("jabbToken");
  res.status(200).json({ message: "user logged out" });
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});

    res.status(200).json({ users });
  } catch (error) {
    console.error(`get user error: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
}

//@desc - display User Profile
//@route - GET/api/auth/me
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(404).json({ status: false, message: "user not found" });
      return;
    }

    res.status(200).json({ status: true, user });
  } catch (error) {
    console.error(`get user error: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc - update user info
//@route - PUT/api/auth/me
export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const userInfo = req.body;

    let user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(404).json({ status: false, message: "user not found" });
      return;
    }

    user = await User.findByIdAndUpdate(userId, userInfo, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ status: true, message: "user info updated", user });
  } catch (error) {
    console.error(`user info update error: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
}

//@desc - delete user profile
//@route - DELETE/api/auth/me
export const deleteUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(404).json({ status: false, message: "user not found" });
      return;
    }

    await User.findByIdAndDelete(userId);
    await JobApp.deleteMany({ applicant: userId });
    await Job.deleteMany({ postedBy: userId });

    res.status(200).json({ status: true, message: "user deleted" });
  } catch (error) {
    console.error(`delete user error: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
}
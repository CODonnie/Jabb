import { Request, Response } from 'express';
import User from '../models/userModel';

//@desc - Get all users
//@route - GET /api/admin/users
//@access - Private
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json({ status: true, users});
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

//@desc - Get a user by ID
//@route - GET /api/admin/users/:id
//@access - Private
export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ status: true, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

//@desc - delete a user
//@route - DELETE /api/admin/users/:id
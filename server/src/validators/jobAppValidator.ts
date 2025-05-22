import { param } from "express-validator";
import mongoose from "mongoose";

export const validateJobApp = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("invalid Job Id"),
];

import { body } from "express-validator";

export const signupValidator = [
  body("firstName").notEmpty().withMessage("firstName is required!"),
  body("lastName").notEmpty().withMessage("lastName is required!"),
  body("email").isEmail().withMessage("must be a valid Email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("paasword must be atleast 6 characters long!"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("must be a valid Email address"),
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 characters long"),
];

export const updateValidator = [
  body("firstName")
    .optional()
    .isLength({ min: 2 })
    .withMessage("first name must be at least 2 characters long"),
  body("lastName")
    .optional()
    .isLength({ min: 2 })
    .withMessage("last name must be at least 2 characters long"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("paasword must be atleast 6 characters long"),
  body("email").isEmail().withMessage("must be a valid Email address"),
];

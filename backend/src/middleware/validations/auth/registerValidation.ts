import { body } from "express-validator";
import { emailValidation } from "../common/emailValidation.js";

export const registerValidation = [
  ...emailValidation,
  body("password")
    .escape()
    .notEmpty()
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number")
    .matches(/[^a-zA-Z0-9]/).withMessage("Password must contain at least one symbol"),
];

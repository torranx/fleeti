import { body } from "express-validator";

export const emailValidation = [
  body("email")
    .notEmpty()
    .escape()
    .trim()
    .isEmail()
    .withMessage("Email is not valid")
];

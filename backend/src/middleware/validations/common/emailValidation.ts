import { body } from "express-validator";

export const emailValidation = [
  body("email")
    .notEmpty()
    .trim()
    .isEmail()
    .withMessage("Email is not valid")
];

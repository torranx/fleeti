import { ExpressValidator } from "express-validator";
import User from "../../../models/user.model";

export const { body } = new ExpressValidator({
  isEmailNotInUse: async (value: string) => {
    const user = await User.findOne({ email: value }).exec();
    if (user) {
      throw new Error("Email already in use");
    }
  },
});

export const emailValidation = [
  body("email")
    .notEmpty()
    .trim()
    .isEmail()
    .withMessage("Email is not valid")
    .isEmailNotInUse(),
];

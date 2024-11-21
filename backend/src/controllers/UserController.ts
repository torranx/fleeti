import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class UserController {
  static async registerUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const hashedPassword = bcrypt.hashSync(password, 10);

      const usernameSuffix = Math.floor(Math.random() * 10_000);
      const username = `${email.split("@")[0]}_${usernameSuffix}`;

      const newUser = new User({
        email,
        password: hashedPassword,
        username
      });

      await newUser.save({
        validateBeforeSave: true,
      });

      res.status(201).json({ email, password, message: "User registered successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to register user" });
    }
  }

  static async checkEmail(req: Request, res: Response) {
    try {
      // this is already validated by the emailValidation middleware
      const { email } = req.body;

      res.status(200).json({ email, exists: false });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to check if user exists" });
    }
  }
}

export default UserController

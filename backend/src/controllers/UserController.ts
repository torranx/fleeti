import { Request, Response } from "express";
import UserService from "../services/UserService.js";

const UserController = {
  checkEmail: async (req: Request, res: Response): Promise<void>  => {
    try {
      const { email } = req.body;

      const exists = await UserService.isExistingUser(email);

      res.status(200).json({ email, exists });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to check if user exists" });
    }
  }
}

export default UserController;

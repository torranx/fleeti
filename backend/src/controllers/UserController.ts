import { Request, Response } from "express";
import UserService from "../services/UserService";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class UserController {
  static async checkEmail(req: Request, res: Response): Promise<void> {
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

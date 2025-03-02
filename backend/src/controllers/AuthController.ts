import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import Session from "../models/session.model";
import mongoose, { ObjectId } from "mongoose";
import UserService from "../services/UserService";
import User from "../models/user.model";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class AuthController {
  static accessTokenDuration = 15 * 60 * 1000;; // 15 mins
  static refreshTokenDuration = 7 * 24 * 60 * 60 * 1000; // 7 days

  static async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (await UserService.isExistingUser(email)) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      const newUser = await UserService.createUser(email, password);
      const { accessToken, refreshToken } = await AuthService.generateToken(newUser.id);
      const isSecure = process.env.NODE_ENV === "production";

      await AuthService.createSession(newUser.id, refreshToken);

      res.status(201)
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          maxAge: AuthController.accessTokenDuration,
          sameSite: "strict",
          secure: isSecure,
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: AuthController.refreshTokenDuration,
          sameSite: "strict",
          secure: isSecure,
        })
        .json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Failed to register user" });
    }
  }

  static async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).exec();

      if (!user) {
        res.status(400).json({ message: "User does not exist" });
        return;
      }

      const hashedPassword = await UserService.hashPassword(password);

      if (user.password !== hashedPassword) {
        res.status(401).json({ message: "Password is incorrect" });
        return;
      }

      const { accessToken, refreshToken } = await AuthService.generateToken(user.id);
      const isSecure = process.env.NODE_ENV === "production";

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: "strict",
        secure: isSecure,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
        secure: isSecure,
      })
      res.status(200).json({ email, success: true, message: "User logged in successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Failed to log in user" });
    }
  }

  static async refresh(req: Request, res: Response) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const payload = await AuthService.verifyToken(refreshToken);
      const userId = new mongoose.Types.ObjectId(payload.id as string);
      const session = await Session.findOne({ userId, refreshToken });

      if (!session) {
        res.status(403).json({ message: "Invalid session", success: false });
        return;
      }

      const isSecure = process.env.NODE_ENV === "production";
      const { accessToken, refreshToken: newRefreshToken } = await AuthService.generateToken(userId.toString());
      await AuthService.updateSession(userId, newRefreshToken);

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: isSecure,
        sameSite: "strict",
        maxAge: AuthController.accessTokenDuration,
      })
        .cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: isSecure,
          sameSite: "strict",
          maxAge: AuthController.refreshTokenDuration,
        })
        .status(200)
        .json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(403).json({ message: "Token refresh failed", success: false });
    }
  }

  static async logout(req: Request, res: Response) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const payload = await AuthService.verifyToken(refreshToken);
      const userId = payload.id as ObjectId;

      await AuthService.deleteSession(userId);

      res.status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to log out", success: false });
    }
  }
}

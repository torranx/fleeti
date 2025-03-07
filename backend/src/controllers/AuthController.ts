import { Request, Response } from "express";
import AuthService from "../services/AuthService.js";
import Session from "../models/session.model.js";
import mongoose, { ObjectId } from "mongoose";
import UserService from "../services/UserService.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const AuthController = {
  ACCESS_TOKEN_DURATION: 15 * 60 * 1000, // 15 mins
  REFRESH_TOKEN_DURATION: 7 * 24 * 60 * 60 * 1000, // 7 days

  registerUser: async (req: Request, res: Response): Promise<void> => {
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
          maxAge: AuthController.ACCESS_TOKEN_DURATION,
          sameSite: "strict",
          secure: isSecure,
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: AuthController.REFRESH_TOKEN_DURATION,
          sameSite: "strict",
          secure: isSecure,
        })
        .json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Failed to register user" });
    }
  },

  loginUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const invalidMessage = "Your login credentials don't match an account in our system.";

      const user = await User.findOne({ email }).exec();

      if (!user) {
        res.status(400).json({ message: invalidMessage });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(400).json({ message: invalidMessage });
        return;
      }

      const { accessToken, refreshToken } = await AuthService.generateToken(user.id);
      const isSecure = process.env.NODE_ENV === "production";
      const userId = user?._id;
      const session = await Session.findOne({ userId });

      if (session) {
        await AuthService.updateSession(userId, refreshToken);
      } else {
        await AuthService.createSession(userId, refreshToken);
      }

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
      res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          name: user.name,
          avatar: user.avatar,
        },
        success: true,
        message: "User logged in successfully"
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Failed to log in user" });
    }
  },

  refresh: async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.cookies;

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
        maxAge: AuthController.ACCESS_TOKEN_DURATION,
      })
        .cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: isSecure,
          sameSite: "strict",
          maxAge: AuthController.REFRESH_TOKEN_DURATION,
        })
        .status(200)
        .json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(403).json({ message: "Token refresh failed", success: false });
    }
  },

  logout: async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.cookies;

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

export default AuthController;

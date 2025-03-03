import { importPKCS8, importSPKI, JWTPayload, jwtVerify, SignJWT } from "jose";
import mongoose, { ObjectId } from "mongoose";
import Session from "../models/session.model.js";
import ms from "ms";

const AuthService = {
  ALG: "RS256",

  generateToken: async (id: string): Promise<{ accessToken: string, refreshToken: string }> => {
    const privateKey: CryptoKey = await importPKCS8(process.env.JOSE_PRIVATE_KEY ?? "", AuthService.ALG);

    const accessToken = await new SignJWT({ id })
      .setProtectedHeader({ alg: AuthService.ALG })
      .setIssuedAt()
      .setExpirationTime("1m")
      .sign(privateKey);

    const refreshToken = await new SignJWT({ id })
      .setProtectedHeader({ alg: AuthService.ALG })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(privateKey);

    return { accessToken, refreshToken };
  },

  verifyToken: async (token: string): Promise<JWTPayload> => {
    try {
      const { payload } = await jwtVerify(token, await importSPKI(process.env.JOSE_PUBLIC_KEY ?? "", AuthService.ALG));
      return payload;
    } catch (error) {
      console.error("Token verification failed:", error);
      throw new Error("Unauthorized");
    }
  },

  createSession: async (userId: mongoose.Types.ObjectId, refreshToken: string): Promise<void> => {
    try {
      const session = new Session({
        userId,
        refreshToken,
        expiresAt: new Date(Date.now() + ms("7d")),
      });

      await session.save();
    } catch (err) {
      console.error("Failed to create session:", err);
      throw new Error("Failed to create session");
    }
  },

  updateSession: async (userId: mongoose.Types.ObjectId, refreshToken: string): Promise<void> => {
    try {
      const session = await Session.findOne({ userId }).exec();

      if (!session) {
        throw new Error("Session not found");
      }

      session.refreshToken = refreshToken;
      session.expiresAt = new Date(Date.now() + ms("7d"));

      await session.save();
    } catch (err) {
      console.error("Failed to update session:", err);
      throw new Error("Failed to update session");
    }
  },

  deleteSession: async (userId: ObjectId): Promise<void> => {
    try {
      await Session.findOneAndDelete({ userId }).exec();
    } catch (err) {
      console.error("Failed to delete session:", err);
      throw new Error("Failed to delete session");
    }
  }
}

export default AuthService;

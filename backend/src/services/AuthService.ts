import { importPKCS8, importSPKI, JWTPayload, jwtVerify, KeyLike, SignJWT } from "jose";
import mongoose, { ObjectId } from "mongoose";
import Session from "../models/session.model";
import ms from "ms";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class AuthService {
  static alg = "RS256";

  static async generateToken(id: string): Promise<{ accessToken: string, refreshToken: string }> {
    const privateKey: KeyLike = await importPKCS8(process.env.JOSE_PRIVATE_KEY ?? "", AuthService.alg);

    const accessToken = await new SignJWT({ id })
      .setProtectedHeader({ alg: AuthService.alg })
      .setIssuedAt()
      .setExpirationTime("1m")
      .sign(privateKey);

    const refreshToken = await new SignJWT({ id })
      .setProtectedHeader({ alg: AuthService.alg })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(privateKey);

    return { accessToken, refreshToken };
  }

  static async verifyToken(token: string): Promise<JWTPayload> {
    try {
      const { payload } = await jwtVerify(token, await importSPKI(process.env.JOSE_PUBLIC_KEY ?? "", AuthService.alg));
      return payload;
    } catch (error) {
      console.error("Token verification failed:", error);
      throw new Error("Unauthorized");
    }
  };

  static async createSession(userId: mongoose.Types.ObjectId, refreshToken: string): Promise<void> {
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
  }

  static async updateSession(userId: mongoose.Types.ObjectId, refreshToken: string): Promise<void> {
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
  }

  static async deleteSession(userId: ObjectId): Promise<void> {
    try {
      await Session.findOneAndDelete({ userId }).exec();
    } catch (err) {
      console.error("Failed to delete session:", err);
      throw new Error("Failed to delete session");
    }
  }
}

import { importPKCS8, importSPKI, JWTPayload, jwtVerify, KeyLike, SignJWT } from "jose";
import { ObjectId } from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class AuthService {
  static alg = "RS256";

  static async generateToken(id: ObjectId): Promise<{ accessToken: string, refreshToken: string }> {
    const privateKey: KeyLike = await importPKCS8(process.env.JOSE_PRIVATE_KEY ?? "", AuthService.alg);

    const accessToken = await new SignJWT({ id })
      .setProtectedHeader({ alg: AuthService.alg })
      .setIssuedAt()
      .setExpirationTime("15m")
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
}

import bcrypt from "bcrypt";
import User from "../models/user.model";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class UserService {
  static generateUsername(email: string): string {
    const usernameSuffix = Math.floor(Math.random() * 10_000);
    return `${email.split("@")[0]}_${usernameSuffix}`;
  }

  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  static async isExistingUser(email: string): Promise<boolean> {
    const user = await User.findOne({ email }).exec();

    return !!user;
  }
}

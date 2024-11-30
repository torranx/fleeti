import bcrypt from "bcrypt";
import User from "../models/user.model";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class UserService {
  static async createUser(email: string, password: string) {
    try {
      const hashedPassword = await UserService.hashPassword(password);
      const username = UserService.generateUsername(email);

      const newUser = new User({
        email,
        password: hashedPassword,
        username
      });

      await newUser.save({
        validateBeforeSave: true,
      });

      return newUser;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to create user");
    }
  }

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

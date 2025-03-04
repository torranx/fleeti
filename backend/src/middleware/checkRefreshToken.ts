import { NextFunction, Request, Response } from "express"

export const checkRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    res.status(401).json({ message: "Unauthorized" });
  }

  next();
}


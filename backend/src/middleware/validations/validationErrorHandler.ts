import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validationErrorHandler = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array().map((err) => ({
        type: err.type,
        field: err.type === "field" ? err.path : undefined,
        message: err.msg,
      })),
    });
    return;
  }
  next();
};

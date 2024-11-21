import { Router } from "express";
import UserController from "../controllers/UserController";
import { registerValidation } from "../middleware/validations/auth/registerValidation";
import { emailValidation } from "../middleware/validations/common/emailValidation";
import { validationErrorHandler } from "../middleware/validations/validationErrorHandler";

const router = Router();

router.post(
  "/auth/register",
  registerValidation,
  validationErrorHandler,
  UserController.registerUser
);

router.post(
  "/check-email",
  emailValidation,
  validationErrorHandler,
  UserController.checkEmail
);

export default router;

import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import { registerValidation } from "../middleware/validations/auth/registerValidation.js";
import { validationErrorHandler } from "../middleware/validations/validationErrorHandler.js";
import { checkRefreshToken } from "../middleware/checkRefreshToken.js";

const router = Router();

router.post(
  "/register",
  registerValidation,
  validationErrorHandler,
  AuthController.registerUser
);

router.post(
  "/login",
  AuthController.loginUser
)

router.post(
  "/refresh",
  checkRefreshToken,
  AuthController.refresh
);

router.post(
  "/logout",
  checkRefreshToken,
  AuthController.logout
)

export default router;

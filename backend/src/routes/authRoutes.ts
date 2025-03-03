import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import { registerValidation } from "../middleware/validations/auth/registerValidation.js";
import { validationErrorHandler } from "../middleware/validations/validationErrorHandler.js";

const router = Router();

router.post("/refresh", AuthController.refresh);

router.post(
  "/register",
  registerValidation,
  validationErrorHandler,
  AuthController.registerUser
);

router.post(
  "/logout",
  AuthController.logout
)

export default router;

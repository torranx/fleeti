import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { registerValidation } from "../middleware/validations/auth/registerValidation";
import { validationErrorHandler } from "../middleware/validations/validationErrorHandler";

const router = Router();

router.post("/refresh", AuthController.refresh);

router.post(
  "/register",
  registerValidation,
  validationErrorHandler,
  AuthController.registerUser
);

export default router;

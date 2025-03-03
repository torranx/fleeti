import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { emailValidation } from "../middleware/validations/common/emailValidation.js";
import { validationErrorHandler } from "../middleware/validations/validationErrorHandler.js";

const router = Router();

router.post(
  "/check-email",
  emailValidation,
  validationErrorHandler,
  UserController.checkEmail
);

export default router;

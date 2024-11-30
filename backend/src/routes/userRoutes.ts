import { Router } from "express";
import UserController from "../controllers/UserController";
import { emailValidation } from "../middleware/validations/common/emailValidation";
import { validationErrorHandler } from "../middleware/validations/validationErrorHandler";

const router = Router();

router.post(
  "/check-email",
  emailValidation,
  validationErrorHandler,
  UserController.checkEmail
);

export default router;

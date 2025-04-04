import express from "express";
import UserController from "../controllers/UserController";
import authValidation from "../validations/AuthValidation";
const router = express.Router();

router.post(
	"/register",
	authValidation.validateRegistration(),
	UserController.register
);
router.post("/login", authValidation.validateLogin(), UserController.login);

export default router;

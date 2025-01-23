import express, { Express, Request, Response } from "express";
import KycController from "../controllers/KycController";
import { uploadMiddleware, upload } from "./../config/multer";
import KycValidation from "../validations/KycValidation";
import authMiddleware from "./../middlewares/authMiddleware";
const router = express.Router();

router.post(
	"/create",
	authMiddleware,
	uploadMiddleware,
	KycValidation.validateKycCreation(),
	KycController.create
);

export default router;

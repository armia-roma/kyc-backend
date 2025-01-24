import express, {Express, Request, Response} from "express";
import KycController from "../controllers/KycController";
import {uploadMiddleware, upload} from "./../config/multer";
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
router.get("/list", authMiddleware, KycController.list);
router.get("/:id", authMiddleware, KycController.findById);

export default router;

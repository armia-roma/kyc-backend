import express, { Express, NextFunction, Request, Response } from "express";
import KycController from "../controllers/KycController";
import { uploadMiddleware, upload } from "./../config/multer";
import KycValidation from "../validations/KycValidation";
import authMiddleware, { AuthRequest } from "./../middlewares/authMiddleware";
import { authorizeRoles } from "./../middlewares/authMiddleware";
const router = express.Router();

router.post(
	"/create",
	authMiddleware,
	uploadMiddleware,
	KycValidation.validateKycCreation(),
	KycController.create
);
router.get(
	"/list",
	authorizeRoles(["admin"]),
	authMiddleware,
	KycController.list
);
router.get("/:id", authMiddleware, KycController.findById);
router.put(
	"/approve/:id",
	authMiddleware,
	authorizeRoles(["admin"]),
	KycController.approve
);
router.put(
	"/reject/:id",
	authMiddleware,
	authorizeRoles(["admin"]),
	KycController.reject
);

export default router;

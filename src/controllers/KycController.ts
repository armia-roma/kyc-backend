import { Request, Response, NextFunction } from "express";
import KycService from "./../services/KycService";
import { IUser, Role } from "../models/User";

import { AuthRequest } from "../middlewares/authMiddleware";
import { AppError } from "../errors/AppError";
import { NotFoundError } from "../errors/NotFoundError";

class KycController {
	create = async (
		req: AuthRequest,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const { full_name, email, address, phone_number } = req.body;
			const file_path = req.file?.path ?? "";

			if (!file_path) {
				res.status(400).json({ message: "file is required" });
				return;
			}
			const userPayload = req.user;

			const userData: Partial<IUser> = userPayload
				? {
						id: userPayload.id,
						userName: userPayload.userName,
						role:
							userPayload.role === "admin"
								? Role.Admin
								: Role.User,
				  }
				: {};

			const kyc = await KycService.create({
				full_name,
				email,
				address,
				phone_number,
				file_path,
				user: userData,
			});
			res.status(201).json({
				data: kyc,
				message: "Kyc created successfully",
			});
		} catch (error: any) {
			next(error);
		}
	};
	async list(req: Request, res: Response, next: NextFunction) {
		try {
			const list = await KycService.list();
			res.status(200).json({ data: list });
		} catch (err: any) {
			next(err);
		}
	}

	async findById(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;

			if (!id) {
				return next(new AppError("Id is Required"));
			}

			const kyc = await KycService.findById(req.params.id);
			if (!kyc) {
				throw new NotFoundError("Kyc not found");
			}

			res.status(200).json({ data: kyc });
		} catch (error: any) {
			next(error);
		}
	}

	async approve(req: Request, res: Response, next: NextFunction) {
		try {
			const kyc = await KycService.approve(req.params.id);
			res.status(200).json({
				data: kyc,
				message: "Kyc has been approved successfully",
			});
		} catch (error: any) {
			next(error);
		}
	}
	async reject(req: Request, res: Response, next: NextFunction) {
		try {
			const kyc = await KycService.reject(req.params.id);
			res.status(200).json({
				data: kyc,
				message: "Kyc has been rejected successfully",
			});
		} catch (error: any) {
			next(error);
		}
	}
}

export default new KycController();

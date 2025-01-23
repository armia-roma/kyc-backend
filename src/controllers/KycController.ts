import {Request, Response, NextFunction} from "express";
import {JwtPayload} from "jsonwebtoken";
import KycService from "./../services/KycService";
import ResponseEntity from "../../utils/ResponseEntity";
import {IUser, Role} from "../models/User";

interface AuthRequest extends Request {
	user?: JwtPayload | string;
}

class KycController {
	create = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const {full_name, email, address, phone_number} = req.body;
			const file_path = req.file?.path ?? "";

			if (!file_path) {
				ResponseEntity.setResponse(400, "File path is required");
				res.status(400).json(ResponseEntity);
				return;
			}
			const userPayload = (req as AuthRequest).user as {
				id: string;
				userName: string;
				role: string;
			};

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

			ResponseEntity.setResponse(201, "KYC created successfully", kyc);
			res.status(201).json(ResponseEntity);
			return;
		} catch (error: any) {
			if (error.message.includes("Validation error")) {
				ResponseEntity.setResponse(400, error.message, null, error);
				res.status(400).json(ResponseEntity);
				return;
			}
		}
	};
	async list(req: Request, res: Response) {
		const list = await KycService.list();
		ResponseEntity.setResponse(200, "KYC list", list);
		res.status(200).json(ResponseEntity);
	}
}

export default new KycController();

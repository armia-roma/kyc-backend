import {Request, Response, NextFunction} from "express";
import UserService from "../services/UserService";
import responseEntity from "../../utils/ResponseEntity";

class UserController {
	async register(req: Request, res: Response, next: NextFunction) {
		try {
			const {userName, email, password, role} = req.body;
			const user = await UserService.register(
				userName,
				email,
				password,
				role
			);
			responseEntity.setResponse(
				201,
				"User registered successfully",
				user
			);

			responseEntity.error = null;

			res.status(201).json(responseEntity);
		} catch (error: any) {
			responseEntity.setResponse(400, error.message, null, error);

			res.status(400).json(responseEntity);
		}
	}
	async login(req: Request, res: Response) {
		try {
			const {email, password} = req.body;
			const token = await UserService.login(email, password);
			responseEntity.setResponse(200, "Login successful", token);

			res.status(200).json(responseEntity);
		} catch (error: any) {
			responseEntity.setResponse(400, error.message, null, error);

			res.status(400).json(responseEntity);
		}
	}
	async verify(req: Request, res: Response) {
		const token = req.body.token;
		try {
			const user = await UserService.verify(token);

			responseEntity.setResponse(200, "valid", user, null);

			res.json(responseEntity);
			return;
		} catch (error) {
			res.status(401).json({error: "Invalid token"});
			return;
		}
	}
}
export default new UserController();

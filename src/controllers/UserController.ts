import { Request, Response, NextFunction } from "express";
import UserService from "../services/UserService";
import responseEntity from "../../utils/ResponseEntity";

class UserController {
	async register(req: Request, res: Response, next: NextFunction) {
		try {
			const { userName, email, password, role } = req.body;
			const user = await UserService.register(
				userName,
				email,
				password,
				role
			);
			responseEntity.status = 201;
			responseEntity.message = "User registered successfully";
			responseEntity.data = {
				id: user._id,
				userName: user.userName,
				email: user.email,
			};
			responseEntity.error = null;

			res.status(201).json(responseEntity);
		} catch (error: any) {
			responseEntity.status = 400;
			responseEntity.message = error.message;
			responseEntity.data = null;
			responseEntity.error = error;

			res.status(400).json(responseEntity);
		}
	}
	async login(req: Request, res: Response) {
		try {
			const { email, password } = req.body;
			const token = UserService.login(email, password);
			responseEntity.status = 200;
			responseEntity.message = "Login successful";
			responseEntity.data = { token };
			responseEntity.error = null;

			return res.status(200).json(responseEntity);
		} catch (error: any) {
			responseEntity.status = 400;
			responseEntity.message = error.message;
			responseEntity.data = null;
			responseEntity.error = error;

			return res.status(400).json(responseEntity);
		}
	}
}
export default new UserController();

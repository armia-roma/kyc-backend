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
			res.json(user);
		} catch (error: any) {
			res.json(error);
		}
	}
}
export default new UserController();

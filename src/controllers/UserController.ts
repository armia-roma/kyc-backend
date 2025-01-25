import { Request, Response, NextFunction } from "express";
import UserService from "../services/UserService";

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
			res.status(201).json({ message: "User created successful", user });
		} catch (error: any) {
			next(error);
		}
	}
	login = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email, password } = req.body;
			const token = await UserService.login(email, password);
			res.status(200).json({ message: "Login success", user: token });
		} catch (error: any) {
			next(error);
		}
	};
}
export default new UserController();

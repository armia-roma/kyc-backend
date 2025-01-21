import { IUser } from "../models/User";
import UserRepository from "../repositories/UserRepository";
import bcrypt from "bcryptjs";
class UserService {
	async register(
		userName: string,
		email: string,
		password: string,
		role: string
	) {
		const existingUser = await UserRepository.findByEmail(email);
		if (existingUser) {
			throw new Error("User already exists");
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await UserRepository.create({
			userName,
			email,
			password: hashedPassword,
			role,
		} as IUser);
		return user;
	}
}
export default new UserService();

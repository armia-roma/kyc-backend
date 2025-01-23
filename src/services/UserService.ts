import { IUser } from "../models/User";
import UserRepository from "../repositories/UserRepository";
import bcrypt from "bcryptjs";
import jwtConfig from "../config/JwtConfig";
import jwt from "jsonwebtoken";

const { jwtSecret, jwtExpiration } = jwtConfig;

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
	async login(email: string, password: string) {
		const user = await UserRepository.findByEmail(email);
		if (!user) {
			throw new Error("User not found");
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new Error("Invalid credentials");
		}
		const token = jwt.sign(
			{ id: user._id, userName: user.userName, role: user.role },
			jwtSecret,
			{
				expiresIn: jwtExpiration,
			}
		);
		return {
			id: user._id,
			userName: user.userName,
			token,
			role: user.role,
		};
	}
}
export default new UserService();

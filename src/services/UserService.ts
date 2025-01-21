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
		// Generate JWT Token
		const token = jwt.sign({ email: user.email }, jwtSecret, {
			expiresIn: jwtExpiration,
		});
		return { email: user.email, id: user._id, token };
	}
}
export default new UserService();

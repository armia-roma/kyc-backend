import { IUser, User } from "../models/User";
import UserRepository from "../repositories/UserRepository";
import bcrypt from "bcryptjs";
import jwtConfig from "../config/JwtConfig";
import jwt, { JwtPayload } from "jsonwebtoken";

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
	async verify(token: string) {
		try {
			const decodedToken = (await jwt.verify(
				token,
				process.env.TOKEN_SECRET as string
			)) as JwtPayload;
			const user = await User.findById(decodedToken.id);

			if (!user) {
				throw new Error("Invalid token");
			}

			return user;
		} catch (error) {
			throw new Error("Something Went Wrong");
		}
	}
}
export default new UserService();

import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Role } from "../models/User";
import { UnauthenticatedError } from "../errors/UnauthenticatedError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
interface IUserPayload extends JwtPayload {
	id: string;
	userName: string;
	role: Role;
}

export interface AuthRequest extends Request {
	user?: IUserPayload;
}

export default function authenticateToken(
	req: AuthRequest,
	res: Response,
	next: NextFunction
) {
	try {
		const authHeader = req.headers["authorization"];

		if (!authHeader) {
			throw new UnauthenticatedError("missing token");
		}

		const token = authHeader && authHeader.split(" ")[1];

		try {
			const decodedToken = jwt.verify(
				token,
				process.env.TOKEN_SECRET as string
			);

			req.user = decodedToken as IUserPayload;
			next();
		} catch (error) {
			console.error(error);
			throw new UnauthenticatedError("invalid token");
		}
	} catch (error: any) {
		next(error);
	}
}
export function authorizeRoles(allowRoles: string[]) {
	return (req: AuthRequest, res: Response, next: NextFunction) => {
		try {
			if (req.user && !allowRoles.includes(req.user.role)) {
				throw new UnauthorizedError();
			}
			next();
		} catch (error: any) {
			next(error);
		}
	};
}

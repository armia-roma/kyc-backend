import jwt, {JwtPayload} from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";
import ResponseEntity from "../../utils/ResponseEntity";

interface AuthRequest extends Request {
	user?: JwtPayload | string;
}

export default function authenticateToken(
	req: AuthRequest,
	res: Response,
	next: NextFunction
) {
	const authHeader = req.headers["authorization"];

	if (!authHeader) {
		ResponseEntity.setResponse(401, "Authorization header missing");
		res.status(401).json(ResponseEntity);
		return;
	}

	const token = authHeader && authHeader.split(" ")[1];

	jwt.verify(
		token,
		process.env.TOKEN_SECRET as string,
		(err: any, user: any) => {
			if (err) {
				ResponseEntity.setResponse(403, "Forbidden");
				res.status(403).json(ResponseEntity);
				return;
			}
			console.log(user, "auth user middleware");
			req.user = user as {id: string; userName: string; role: string};
			next();
		}
	);
}

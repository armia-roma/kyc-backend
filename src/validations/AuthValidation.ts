import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import responseEntity from "../../utils/ResponseEntity";

const registerSchema = Joi.object({
	userName: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
	role: Joi.string().valid("admin", "user").required().messages({
		"any.only": 'Role must be either "admin" or "user".',
		"any.required": "Role is required.",
	}),
});

class AuthValidation {
	validateRegistration() {
		return (req: Request, res: Response, next: NextFunction): void => {
			const { error } = registerSchema.validate(req.body);
			if (error) {
				responseEntity.status = 400;
				responseEntity.message = error.message;
				responseEntity.data = null;
				responseEntity.error = error.details;
				res.status(404).json(responseEntity);
				return;
			}
			next();
		};
	}
}
export default new AuthValidation();

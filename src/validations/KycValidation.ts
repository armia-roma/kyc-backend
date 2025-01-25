import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const Schema = Joi.object({
	full_name: Joi.string().required(),
	email: Joi.string().email().required(),
	phone_number: Joi.string()
		.pattern(/^[0-9]{10}$/)
		.required()
		.messages({
			"string.pattern.base": "Mobile number must be a 10-digit number.",
			"any.required": "Mobile number is required.",
		}),
	address: Joi.string().required(),
});

class KycValidation {
	validateKycCreation() {
		return (req: Request, res: Response, next: NextFunction): void => {
			const { error } = Schema.validate(req.body);

			if (error) {
				throw new AppError(error.message);
			}
			if (!req.file) {
				throw new AppError("File is required");
			}
			next();
		};
	}
}
export default new KycValidation();

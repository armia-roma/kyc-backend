import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import responseEntity from "../../utils/ResponseEntity";

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
			console.log(req.body);
			const { error } = Schema.validate(req.body);

			if (error) {
				responseEntity.setResponse(
					400,
					error.message,
					null,
					error.details
				);
				res.status(404).json(responseEntity);
				return;
			}
			if (!req.file) {
				responseEntity.setResponse(400, "File is required", null, null);

				res.status(400).json(responseEntity);
				return;
			}
			next();
		};
	}
}
export default new KycValidation();

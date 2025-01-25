import { BaseError } from "./BaseError";

export class AppError extends BaseError {
	constructor(message: string) {
		super(message, 400);
	}
}

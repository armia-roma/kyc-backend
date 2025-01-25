import { BaseError } from "./BaseError";

export class UnauthenticatedError extends BaseError {
	constructor(message: string = "Unauthenticated") {
		super(message, 401);
	}
}

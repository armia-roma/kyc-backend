export class BaseError extends Error {
	constructor(public message: string, public status: number = 400) {
		super(message);
	}
}

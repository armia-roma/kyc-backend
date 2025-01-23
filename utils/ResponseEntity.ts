class ResponseEntity {
	error: any;
	status: any;
	message: any;
	data: any;
	constructor(status: number | null, message: string | null, data: any, error: any) {
		this.status = status;
		this.message = message;
		this.data = data;
		this.error = error
	}
	setResponse(
		status: number,
		message: string,
		data: any = null,
		error: any = null
	) {
		this.status = status;
		this.message = message;
		this.data = data;
		this.error = error;
	}
}

export default new ResponseEntity(null, null, null, null);

class ResponseEntity {
	error: any;
	status: any;
	message: any;
	data: any;
	constructor(status: any, message: any, data: any, error: any) {
		this.status = status;
		this.message = message;
		this.data = data;
	}
}

export default new ResponseEntity(null, null, null, null);

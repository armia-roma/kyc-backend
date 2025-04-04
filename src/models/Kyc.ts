import mongoose, {Schema} from "mongoose";

import {IUser} from "./User";

enum Status {
	PENDING = "pending",
	APPROVED = "approved",
	REJECTED = "rejected",
}
interface IKyc extends Document {
	full_name: string;
	address: string;
	phone_number: string;
	email: string;
	file_path: string;
	status: Status;
	user: Partial<IUser>;
}
const kycSchema = new mongoose.Schema(
	{
		full_name: {type: String, required: true},
		email: {type: String, required: true, unique: true},
		phone_number: {type: String, required: true},
		address: {type: String, required: true},
		file_path: {type: String, required: true},
		status: {
			type: String,
			enum: ["pending", "approved", "rejected"],
			default: "Pending",
		},
		user: {
			id: {type: String, required: true},
			userName: {type: String, required: true},
			role: {
				type: String,
				enum: ["admin", "user"],
				default: "user",
			},
		},
	},
	{timestamps: true}
);

const Kyc = mongoose.model<IKyc>("Kyc", kycSchema);
export {Kyc, IKyc};

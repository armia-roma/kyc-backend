import mongoose, {Document, Schema} from "mongoose";

// Define the User interface
export enum Role {
	Admin = "admin",
	User = "user",
}
interface IUser extends Document {
	userName: string;
	email: string;
	password: string;
	role: Role;
}

// Define the User schema
const userSchema: Schema = new Schema({
	userName: {type: String, required: true, unique: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	role: {
		type: String,
		required: true,
		enum: ["admin", "user"],
	},
});

// Create the User model
const User = mongoose.model<IUser>("User", userSchema);

export {User, IUser};

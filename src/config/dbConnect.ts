import mongoose from "mongoose";
import { mongo } from "./config";

export const dbConnect = async () => {
	try {
		const connection = await mongoose.connect(mongo.MONGO_CONNECTION);
	} catch (err) {
		console.log(err);
	}
};

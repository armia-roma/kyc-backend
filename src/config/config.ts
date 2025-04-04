import dotenv from "dotenv";
dotenv.config();
export const MONGO_USER = process.env.MONGO_USER || "";
export const MONGO_URL = process.env.MONGO_URL || "";
export const MONGO_DATABASE = process.env.MONGO_DATABASE || "";
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";

export const mongo = {
	MONGO_DATABASE,
	MONGO_PASSWORD,
	MONGO_URL,
	MONGO_USER,
	MONGO_CONNECTION: `mongodb+srv://${encodeURIComponent(
		MONGO_USER
	)}:${encodeURIComponent(
		MONGO_PASSWORD
	)}@cluster0.2tk2bcj.mongodb.net/${encodeURIComponent(
		MONGO_DATABASE
	)}?retryWrites=true&w=majority&appName=Cluster0`,
};

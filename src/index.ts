// we’ll install the @types declaration packages for Express and Node.js, which offer type definitions in the form of declaration files.
import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import {dbConnect} from "./config/dbConnect";
import authRoutes from "./routes/AuthRoutes";
import kycRoutes from "./routes/KycRoutes";
import cors from "cors";
import {Kyc} from "./models/Kyc";
import {User} from "./models/User";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

dbConnect();
app.use(cors());
app.use(express.json());
app.use("/api/user", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/kyc", kycRoutes);
app.get("/api/report", async (req: Request, res: Response) => {
	const total_users = await User.countDocuments();

	const total_kyc = await Kyc.countDocuments();

	const kyc_status_count: {_id: string; count: number}[] =
		await Kyc.aggregate([
			{
				$group: {
					_id: "$status",
					count: {$sum: 1},
				},
			},
		]);
	const kycStatusCount = kyc_status_count.map((item: any) => ({
		status: item._id,
		count: item.count,
	}));
	res.json({
		total_users,
		total_kyc,
		kyc_status: kycStatusCount,
	});
});
app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

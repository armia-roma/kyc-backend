// we’ll install the @types declaration packages for Express and Node.js, which offer type definitions in the form of declaration files.
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/dbConnect";
import authRoutes from "./routes/AuthRoutes";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

dbConnect();
app.use(express.json());
app.use("/api/user", authRoutes);

app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

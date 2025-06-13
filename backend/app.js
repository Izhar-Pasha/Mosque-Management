import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errHandler } from "./middlewares/errorHandler.js";
import authRouter from "./routes/auth.routes.js";
import saathiRouter from "./routes/saathi.routes.js";
import professionalRouter from "./routes/professional.routes.js";
import studentRouter from "./routes/student.routes.js";
import dbConnect from "./connections/dbConnection.js";
import cookieParser from "cookie-parser";
import statsRouter from "./routes/Stats.routes.js";
import "./connections/redisClient.js";

dotenv.config({ path: "./config/.env" });

const app = express();
// middleware to parse JSON payloads
app.use(express.json());

// Allow cross-origin requests from frontend domain
app.use(
  cors({
    origin: ["http://localhost:3000", "https://mosque-management.vercel.app/"],
    credentials: true,
  })
);
// Cookies
app.use(cookieParser());

// DB Connection to mongoDB atlas
dbConnect();

// API Routes
app.use("/", authRouter);
app.use("/stats", statsRouter);
app.use("/api/saathi", saathiRouter);
app.use("/api/professional", professionalRouter);
app.use("/api/student", studentRouter);

// Centralized error handler
app.use(errHandler);

export default app;

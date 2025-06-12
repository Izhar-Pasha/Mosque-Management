import express from "express";
import { Stats } from "../controllers/StatsController.js";
import { Authentication } from "../middlewares/auth.js";

const statsRouter = express.Router();

statsRouter.get("/", Authentication, Stats.getAllCounts);

export default statsRouter;

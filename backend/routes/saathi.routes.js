import express from "express";
import {
  createSaathi,
  getSaathi,
  updateSaathi,
  deleteSaathi,
} from "../controllers/saathiController.js";
import { Authentication } from "../middlewares/auth.js";

const saathiRouter = express.Router();

saathiRouter.post("/", Authentication, createSaathi);
saathiRouter.get("/", Authentication, getSaathi);
saathiRouter.put("/:id", Authentication, updateSaathi);
saathiRouter.delete("/:id", Authentication, deleteSaathi);

export default saathiRouter;

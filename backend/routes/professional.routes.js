import express from "express";
import {
  createProfessional,
  getProfessional,
  updateProfessional,
  deleteProfessional,
} from "../controllers/professionalController.js";
import { Authentication } from "../middlewares/auth.js";

const professionalRouter = express.Router();

professionalRouter.post("/", Authentication, createProfessional);
professionalRouter.get("/", Authentication, getProfessional);
professionalRouter.put("/:id", Authentication, updateProfessional);
professionalRouter.delete("/:id", Authentication, deleteProfessional);

export default professionalRouter;

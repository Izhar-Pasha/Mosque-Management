import express from "express";
import {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";
import { Authentication } from "../middlewares/auth.js";

const studentRouter = express.Router();

studentRouter.post("/", Authentication, createStudent);
studentRouter.get("/", Authentication, getStudents);
studentRouter.put("/:id", Authentication, updateStudent);
studentRouter.delete("/:id", Authentication, deleteStudent);

export default studentRouter;

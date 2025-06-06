import { login, logout } from "../middlewares/auth.js";
import express from "express";

const authRouter = express.Router();

// authRouter.post("/registration", register);
// authRouter.get("/allAdmins", getAdmin);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;

import { register, login } from "../controllers/auth.controller.js";
import express from "express";

const authRouter = express.Router();

authRouter.post("/users", register);
authRouter.get("/users", login);

export default authRouter;

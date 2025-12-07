import { Router } from "express";
import authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/users", authController.getAll);

authRouter.get("/users/:id", authController.getById);

authRouter.post("/users/signup", authController.signUp);

authRouter.post("/users/signin", authController.signIn);



export default authRouter;
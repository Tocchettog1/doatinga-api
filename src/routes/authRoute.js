import { Router } from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.get("/users", authMiddleware, authController.getAll);

authRouter.get("/users/:id", authMiddleware, authController.getById);

authRouter.put("/users/:id", authMiddleware, authController.put);

authRouter.delete("/users/:id", authMiddleware, authController.delete);

authRouter.post("/users/signup", authController.signUp);

authRouter.post("/users/signin", authController.signIn);



export default authRouter;
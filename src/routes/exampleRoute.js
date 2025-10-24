import { Router } from "express";
import exampleController from "../controllers/exampleController.js";

const exampleRouter = Router();

exampleRouter.get("/example", exampleController.getAll)


export default exampleRouter;
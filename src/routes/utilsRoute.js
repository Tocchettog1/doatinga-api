import { Router } from "express";
import utilsController from "../controllers/utilsController.js";

const utilsRouter = Router();

utilsRouter.get("/utils/lookup-cep", utilsController.lookupCep);

export default utilsRouter;
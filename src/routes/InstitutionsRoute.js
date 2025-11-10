import { Router } from "express";
import InstitutionsController from "../controllers/InstitutionsController.js";

const InstitutionsRouter = Router();

InstitutionsRouter.get('/', InstitutionsController.getAll);

export default InstitutionsRouter;
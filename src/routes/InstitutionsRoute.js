import { Router } from "express";
import InstitutionsController from "../controllers/InstitutionsController.js";

const institutionsRouter = Router();

institutionsRouter.get('/', InstitutionsController.getAll);

institutionsRouter.get('/:idInstitution', InstitutionsController.getById);

institutionsRouter.post('/', InstitutionsController.post);

// institutionsRouter.put('/:id/opening-days/:idDay', InstitutionsController.putOpeningDays);

institutionsRouter.delete('/:id', InstitutionsController.delete);


export default institutionsRouter;
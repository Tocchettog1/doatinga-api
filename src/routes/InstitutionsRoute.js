import { Router } from "express";
import InstitutionsController from "../controllers/InstitutionsController.js";

const institutionsRouter = Router();


// Only Institutions

institutionsRouter.get('/', InstitutionsController.getAll);

institutionsRouter.get('/:id', InstitutionsController.getById);

institutionsRouter.put('/:id', InstitutionsController.put);

institutionsRouter.post('/', InstitutionsController.post);

institutionsRouter.delete('/:id', InstitutionsController.delete);


// Institutions Opening Days

institutionsRouter.get('/:id/opening-days', InstitutionsController.getAllInstitutionOpeningDays);

institutionsRouter.get('/:id/opening-days/:idDay', InstitutionsController.getInstitutionOpeningDaysById);

institutionsRouter.put('/:id/opening-days/:idDay', InstitutionsController.putInstitutionOpeningDays);

institutionsRouter.post('/opening-days', InstitutionsController.postInstitutionOpeningDays);

institutionsRouter.delete('/:id/opening-days/:idDay', InstitutionsController.deleteInstitutionOpeningDays);


export default institutionsRouter;
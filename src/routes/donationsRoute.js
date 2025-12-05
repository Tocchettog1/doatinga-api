import { Router } from "express";
import donationsController from "../controllers/donationsController.js";

const donationRouter = Router();

donationRouter.post("/", donationsController.post);

donationRouter.get("/", donationsController.getAll);

donationRouter.get("/:idInstitution", donationsController.getByInstitution);

donationRouter.get("/:idInstitution/:id", donationsController.getById);

donationRouter.put("/:idInstitution/:id", donationsController.put);

donationRouter.delete("/:idInstitution/:id", donationsController.delete);

export default donationRouter;
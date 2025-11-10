import { Router } from "express";
import donationsController from "../controllers/donationsController.js";

const donationRouter = Router();

donationRouter.post("/", donationsController.post);

export default donationRouter;
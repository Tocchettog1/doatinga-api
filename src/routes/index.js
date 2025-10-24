import express from 'express';
import exampleRouter from './exampleRoute.js';

const routes = express.Router();

routes.use(exampleRouter);

export default routes;

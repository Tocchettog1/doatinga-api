import express from 'express';
import exampleRouter from './exampleRoute.js';
import utilsRouter from './utilsRoute.js';

const routes = express.Router();

routes.use(exampleRouter);
routes.use(utilsRouter);

export default routes;

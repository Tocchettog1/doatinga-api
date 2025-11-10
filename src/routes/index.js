import express from 'express';
import exampleRouter from './exampleRoute.js';
import utilsRouter from './utilsRoute.js';
import authRouter from './authRoute.js';
import InstitutionsRouter from './InstitutionsRoute.js';

const routes = express.Router();

/** Auth */
routes.use(authRouter);

/** Institutions */
routes.use('/institutions', InstitutionsRouter);

/** Utils */
routes.use(exampleRouter);
routes.use(utilsRouter);

export default routes;

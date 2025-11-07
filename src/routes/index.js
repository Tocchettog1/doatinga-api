import express from 'express';
import exampleRouter from './exampleRoute.js';
import utilsRouter from './utilsRoute.js';

import InstitutionsRouter from './InstitutionsRoute.js';

const routes = express.Router();

routes.use(exampleRouter);
routes.use(utilsRouter);

routes.use('/Institutions', InstitutionsRouter)

export default routes;

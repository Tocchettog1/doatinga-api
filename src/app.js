import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';
import AppError from './utils/AppError.js';

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        this.notFount();
        this.exceptionHandlers();
    }

    middlewares() {
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use(morgan('dev'));
    }

    routes() {
        this.server.use(routes);
    }

    notFount() {
        // Middleware para 404
        this.server.use((req, res, next) => {
            const err = new AppError('Page Not Found', 404);
            next(err);
        });
    }

    exceptionHandlers() {
        this.server.use(errorHandler);
    }
}

export default new App().server;
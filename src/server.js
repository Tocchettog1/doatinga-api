import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import helmet from 'helmet';
import morgan from 'morgan';

const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));

server.use('/', routes);

server.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT || 3001}`);
  console.log(`URL: http://${process.env.HOST}:${process.env.PORT || 3001}`);
});
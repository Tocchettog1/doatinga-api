import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

// Workaround para obter o __dirname no ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    ssl: { rejectUnauthorized: false }
  },
  migrations: {
    directory: path.join(__dirname, 'src', 'data', 'migrations')
  },
  seeds: {
    directory: path.join(__dirname, 'src', 'data', 'seeds')
  }
};

export default config;
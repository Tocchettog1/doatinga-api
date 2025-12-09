import 'dotenv/config';

import fs from 'fs';
import https from 'https';
import http from 'http';
import app from './app.js';

const port = process.env.PORT || 3000;
const baseUrl = process.env.APP_URL || 'localhost';

let server;

if (process.env.SSL_KEY_PATH && process.env.SSL_CERT_PATH) {
  try {
    const options = {
      key: fs.readFileSync(process.env.SSL_KEY_PATH),
      cert: fs.readFileSync(process.env.SSL_CERT_PATH),
      ca: fs.readFileSync(process.env.SSL_CA_PATH)
    };
    server = https.createServer(options, app);
    console.log('Servidor iniciado em modo HTTPS.');
  } catch (error) {
    console.error('Erro ao ler os certificados SSL. Iniciando em HTTP.', error);
    server = http.createServer(app);
  }
} else {
  server = http.createServer(app);
  console.log('Servidor iniciado em modo HTTP.');
}

server.listen(port, () => {
  console.log(`🚀 Servidor rodando em ${baseUrl}:${port}`);
});
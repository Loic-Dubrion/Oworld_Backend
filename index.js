require('dotenv').config();
const http = require('http');

const logger = require('./app/services/logger');
const app = require('./app');

const PORT = process.env.PORT ?? 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`HTTP server ready on port ${PORT}, => http://${process.env.PGHOST}:${PORT} 🚀🚀🚀`);
});

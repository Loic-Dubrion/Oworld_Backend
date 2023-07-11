require('dotenv').config();
// const http = require('http');

// const logger = require('./app/services/logger');
// const app = require('./app');

// const PORT = process.env.PORT ?? 3000;

// const server = http.createServer(app);

// server.listen(PORT, () => {
//   logger.info(`HTTP server ready on port ${PORT}, => http://${process.env.PGHOST}:${PORT} 🚀🚀🚀`);
// });

const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('../etc/nginx/ssl-certificates/www.lodev.tech.key'),
  cert: fs.readFileSync('../etc/nginx/ssl-certificates/www.lodev.tech.crt')
};

const server = https.createServer(options, app);

server.listen(PORT, () => {
  logger.info(`HTTPS server ready on port ${PORT}`);
});
const bunyan = require('bunyan');

const env = process.env.NODE_ENV;
const streams = [];

// If dev environment, add the console flow (Stdout)
if (env === 'development') {
  streams.push({
    stream: process.stdout,
    level: 'debug',
  });
}

// If prod environment, add the flow in the file logs/
if (env === 'production') {
  streams.push({
    path: 'logs/oWorld.log',
    level: 'error',
    type: 'rotating-file',
    period: '1d',
    count: 1,
  });
}

const logger = bunyan.createLogger({
  name: 'O\'World',
  level: 'trace',
  streams,
});

module.exports = logger;

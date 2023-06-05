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
    path: 'logs/connected_garden.log',
    level: 'error',
    type: 'rotating-file',
    period: '3000ms',
    count: 10,
  });
}

const logger = bunyan.createLogger({
  name: 'O\'World', // name of the logger ( because you can have several )
  level: 'trace', // minimum level of errors to be displayed
  streams,
});

module.exports = logger;

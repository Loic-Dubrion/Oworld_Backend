const expressSwagger = require('express-jsdoc-swagger');
const logger = require('./logger');

/**
 * Configuring swagger
 */
const swaggerOptions = {
  servers: [
    {
      url: `http://${process.env.PGHOST}:${process.env.PORT}` || 'http://localhost:3000',
    },
  ],
  info: {
    version: '1.0',
    title: 'O\'World API',
    description: 'API with data on every country in the world. With multiple sources (World Bank, Rest country)',
  },
  baseDir: `${__dirname}/app`,
  filesPattern: './**/*.js',
  swaggerUIPath: '/api-docs',
  exposeSwaggerUI: true,
};

function injectSwagger(app, baseDir) {
  logger.info('swagger UI injected');
  swaggerOptions.baseDir = baseDir;
  expressSwagger(app)(swaggerOptions);
}

module.exports = injectSwagger;

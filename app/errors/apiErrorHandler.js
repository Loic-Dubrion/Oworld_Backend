const Error400 = require('./Error400');
const Error401 = require('./Error401');
const Error403 = require('./Error403');
const Error404 = require('./Error404');
const Error409 = require('./Error409');
const logger = require('../services/logger');

function apiErrorHandler(err, __req, res) {
  logger.error(err);
  if (
    err instanceof Error400
    || err instanceof Error401
    || err instanceof Error403
    || err instanceof Error404
    || err instanceof Error409
  ) {
    res.status(err.httpStatusCode).json({
      httpCode: err.httpStatusCode,
      status: 'error',
      message: err.message,
    });
  } else {
    res.status(500).json({
      httpCode: 500,
      status: 'error',
      message: 'Internal Server Error',
    });
  }
}

module.exports = apiErrorHandler;

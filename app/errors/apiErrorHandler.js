const Error400 = require('./Error400');
const Error401 = require('./Error401');
const Error403 = require('./Error403');
const Error404 = require('./Error404');
const Error409 = require('./Error409');
const Error503 = require('./Error503');
const sendEmail = require('../services/mailer/sender');
const logger = require('../services/logger');

/**
 * Error handler for API requests.
 *
 * @param {Error} err - The error object.
 * @param {Object} __req - The request object (unused).
 * @param {Object} res - The response object.
 */
function apiErrorHandler(err, __req, res) {
  logger.error(err);

  // Check the type of error and handle accordingly
  if (
    err instanceof Error400 // Bad Request error
    || err instanceof Error401 // Unauthorized error
    || err instanceof Error403 // Forbidden error
    || err instanceof Error404 // Not Found error
    || err instanceof Error409 // Conflict error
  ) {
    res.status(err.httpStatusCode).json({
      httpCode: err.httpStatusCode,
      status: 'error',
      message: err.message,
    });
  } else if (err instanceof Error503) { // Service Unavailable error
    res.status(err.httpStatusCode).json({
      httpCode: err.httpStatusCode,
      status: 'error',
      message: err.message,
    });
    // Send an email to admin if an external api stops responding
    sendEmail(
      'Service Unavailable Error 503',
      `Error occurred at: ${new Date().toISOString()}\n${err.message}`,
      null, // no attachment
      null, // no attachment
    );
  } else {
    // Handle other types of errors with a generic 500 Internal Server Error response
    res.status(500).json({
      httpCode: 500,
      status: 'error',
      message: 'Internal Server Error',
    });
  }
}

module.exports = apiErrorHandler;

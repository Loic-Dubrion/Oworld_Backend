const sanitizer = require('sanitizer');

/**
 * Configuring bodySanitizer.
 * "Cleans up all incoming data
 */
const bodySanitizer = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach((propName) => {
      req.body[propName] = sanitizer.escape(req.body[propName]);
    });
  }
  next();
};

module.exports = bodySanitizer;

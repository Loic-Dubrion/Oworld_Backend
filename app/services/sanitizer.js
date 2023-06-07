// eslint-disable-next-line import/no-extraneous-dependencies
const sanitizer = require('sanitizer');

const bodySanitizer = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach((propName) => {
      req.body[propName] = sanitizer.escape(req.body[propName]);
    });
  }
  next();
};

module.exports = bodySanitizer;

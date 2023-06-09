/**
 * Middleware function to check the validity of URL parameters
 * If the parameter does not match the schemas, a 400 error is raised.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function
 *
 * @throws {Error} - If doesn't match, error 400
 */

const Error400 = require('../errors/Error400');

const validateParam = {

  validateId: () => (req, res, next, id) => {
    const idRegex = /^[0-9]+$/;
    if (!idRegex.test(id)) {
      throw new Error400(`Value ${id} invalid.`);
    }
    next();
  },

  validateIso: () => (req, res, next, iso) => {
    const isoRegex = /^[a-zA-Z]{2,3}$/;
    if (!isoRegex.test(iso)) {
      throw new Error400(`Value ${iso} invalid.`);
    }
    next();
  },
};

module.exports = validateParam;

const Error401 = require('../errors/Error401');
const Error403 = require('../errors/Error403');

/**
 * Middleware for authentication.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const auth = async (req, res, next) => {
  const userId = Number(req.params.userId);

  // Check if user is authenticated
  console.log(req.session);
  if (!req.session.user) {
    return next(new Error401('Access forbidden - please login'));
  }

  if (userId !== req.session.user.id) {
    return next(new Error403('Access forbidden'));
  }

  // Proceed to the next middleware or route handler
  return next();
};

module.exports = auth;

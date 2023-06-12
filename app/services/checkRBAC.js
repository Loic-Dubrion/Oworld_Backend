const Error403 = require('../errors/Error403');

/**
 * Middleware to check if the user has a certain role.
 *
 * This function takes a roleNeeded and checks if it exists in the user's session roles.
 * If the user doesn't have the required role, it passes an Error403 to the next middleware.
 *
 * @param {string} roleNeeded - The role needed for the user to proceed.
 *
 * @returns {Function} - Returns an async middleware function that accepts req, res, and next.
 */
const checkRole = (roleNeeded) => async (req, res, next) => {
  const { roles } = req.session.user;

  if (!roles || !roles.includes(roleNeeded)) {
    return next(new Error403('Forbidden'));
  }

  return next();
};

/**
 * Middleware to check if the user has a certain permission.
 *
 * This function takes a permissionNeeded and checks if it exists in the user's session permissions.
 * If the user doesn't have the required permission, it passes an Error403 to the next middleware.
 *
 * @param {string} permissionNeeded - The permission needed for the user to proceed.
 *
 * @returns {Function} - Returns an async middleware function that accepts req, res, and next.
 */
const checkPermission = (permissionNeeded) => async (req, res, next) => {
  const { permissions } = req.session.user;

  if (!permissions || !permissions.includes(permissionNeeded)) {
    return next(new Error403('Forbidden'));
  }

  return next();
};

module.exports = {
  checkRole,
  checkPermission,
};

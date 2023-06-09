const Error403 = require('../errors/Error403');

const checkRole = (roleNeeded) => async (req, res, next) => {
  const { roles } = req;

  if (!roles || !roles.includes(roleNeeded)) {
    return next(new Error403('Forbidden'));
  }

  return next();
};

const checkPermission = (permissionNeeded, rolesNeeded = []) => async (req, res, next) => {
  const { permissions, roles } = req;

  if (!permissions || !permissions.includes(permissionNeeded)) {
    return next(new Error403('Forbidden'));
  }

  if (rolesNeeded.length > 0) {
    const hasRole = rolesNeeded.some((role) => roles.includes(role));

    if (!hasRole) {
      return next(new Error403('Forbidden'));
    }
  }

  return next();
};

module.exports = {
  checkRole,
  checkPermission,
};

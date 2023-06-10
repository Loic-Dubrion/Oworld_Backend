const Error403 = require('../errors/Error403');

const checkRole = (roleNeeded) => async (req, res, next) => {
  const { roles } = req.session.user;

  if (!roles || !roles.includes(roleNeeded)) {
    return next(new Error403('Forbidden'));
  }

  return next();
};

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

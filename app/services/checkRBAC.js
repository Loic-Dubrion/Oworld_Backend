const Error403 = require('../errors/Error403');

const checkRole = (roleNeeded) => async (req, res, next) => {
  console.log('Checking role', req.session.user.roles);
  const { roles } = req.session.user;

  if (!roles || !roles.includes(roleNeeded)) {
    return next(new Error403('Forbidden'));
  }

  return next();
};

const checkPermission = (permissionNeeded) => async (req, res, next) => {
  const { permissions } = req.session.user;
  console.log('Checking permission', permissions);

  if (!permissions || !permissions.includes(permissionNeeded)) {
    return next(new Error403('Forbidden'));
  }

  return next();
};

module.exports = {
  checkRole,
  checkPermission,
};

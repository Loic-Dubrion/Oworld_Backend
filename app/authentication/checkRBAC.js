const jwt = require('jsonwebtoken');
const Error403 = require('../errors/Error403');
const auth = require('./jwtService');

const checkUserId = async (req, res, next) => {
  const user = await auth.getAccessTokenUser(req);

  if (!user || user.id !== Number(req.params.userId)) {
    return res.status(403).json({ status: 'error', message: 'Forbidden' });
  }

  return next();
};

const checkRole = (roleNeeded) => async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ status: 'error', message: 'No token provided' });

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);

    if (!user || !user.roles.includes(roleNeeded)) {
      throw new Error403({ status: 'error', message: 'Forbidden' });
    }

    return next();
  } catch (error) {
    return res.status(403).json({ status: 'error', message: 'Invalid token' });
  }
};

const checkPermission = (permissionNeeded) => async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ status: 'error', message: 'No token provided' });

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);

    if (!user || !user.permissions.includes(permissionNeeded)) {
      throw new Error403({ status: 'error', message: 'Forbidden' });
    }

    return next();
  } catch (error) {
    return res.status(403).json({ status: 'error', message: 'Invalid token' });
  }
};

module.exports = {
  checkRole,
  checkPermission,
  checkUserId,
};

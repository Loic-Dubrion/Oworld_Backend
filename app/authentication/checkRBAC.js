require('dotenv').config();
const jwt = require('jsonwebtoken');
const auth = require('./jwtService');
const Error401 = require('../errors/Error401');
const Error403 = require('../errors/Error401');

const checkUserId = async (req, res, next) => {
  try {
    const user = await auth.getAccessTokenUser(req);

    if (!user || user.id !== Number(req.params.userId)) {
      throw new Error403('Forbidden');
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

const checkRole = (roleNeeded) => async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new Error401('No token provided');
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = decodedToken.data; // Obtenez les données de l'utilisateur à partir du token décodé

    if (!user.roles || !user.roles.includes(roleNeeded)) {
      throw new Error403('Forbidden');
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

const checkPermission = (permissionNeeded) => async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new Error401('No token provided');
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = decodedToken.data; // Obtenir les données de l'utilisateur à partir du token décodé

    if (!user.permissions || !user.permissions.includes(permissionNeeded)) {
      throw new Error403('Forbidden');
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  checkRole,
  checkPermission,
  checkUserId,
};

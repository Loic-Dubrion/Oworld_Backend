/**
 * @module RBAC
 */

// Import environment variables
require('dotenv').config();

// Import libraries
const jwt = require('jsonwebtoken');
const auth = require('./jwtService');

// Import errors
const { Error401, Error403 } = require('../../errors');

/**
 * Middleware to check if the request's userId matches the authenticated user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {function} The next middleware function or an error if the userId doesn't match.
 * @throws {Error403} - Forbidden error if the userId doesn't match.
 */
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

/**
 * Middleware to check if the user has the required role.
 * @param {string} roleNeeded - The required role.
 * @returns {function} The middleware function to check the user's role.
 * @throws {Error401} - No token provided error if the authorization token is missing.
 * @throws {Error403} - Forbidden error if the user doesn't have the required role.
 */
const checkRole = (roleNeeded) => async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new Error401('No token provided');
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = decodedToken.data; // Get user data from the decoded token
    if (!user.roles || !user.roles.includes(roleNeeded)) {
      throw new Error403('Forbidden');
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Middleware to check if the user has the required permission.
 * @param {string} permissionNeeded - The required permission.
 * @returns {function} The middleware function to check the user's permission.
 * @throws {Error401} - No token provided error if the authorization token is missing.
 * @throws {Error403} - Forbidden error if the user doesn't have the required permission.
 */
const checkPermission = (permissionNeeded) => async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new Error401('No token provided');
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = decodedToken.data;

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

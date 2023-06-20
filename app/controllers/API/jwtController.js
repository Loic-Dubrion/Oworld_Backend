/**
 * @fileoverview Controller for JWT-related operations.
 * @module jwtController
 */

const jwt = require('jsonwebtoken');

const auth = require('../services/jwtService');
const sendReset = require('../services/sendPasswordReset');
const Error400 = require('../../errors/Error400');
const Error403 = require('../../errors/Error403');

const UserDataMapper = require('../../models/UserDataMapper');

/**
 * Controller function for authenticating a user and generating access and refresh tokens.
 * @param {object} request - The request object.
 * @param {object} request.body - The request body.
 * @param {string} request.body.username - The user's username.
 * @param {string} request.body.password - The user's password.
 * @param {object} response - The response object.
 * @returns {Promise} A promise that resolves to the response containing
 * the access and refresh tokens.
 * @throws {Error403} - Forbidden error if the user authentication fails.
 */
const logUser = async (request, response) => {
  const { username, password } = request.body;

  const user = await auth.authentify(username, password);

  if (user) {
    const accessToken = auth.generateAccessToken(request.ip, user);
    const refreshToken = await auth.generateRefreshToken(user);

    return response.status(200).json({
      status: 'success',
      data: { accessToken, refreshToken },
    });
  }
  throw new Error403('Forbidden');
};

/**
 * Controller function for refreshing the access token using a valid refresh token.
 * @param {object} request - The request object.
 * @param {object} request.headers - The request headers.
 * @param {string} request.headers.authorization - The authorization token.
 * @param {object} response - The response object.
 * @returns {Promise} A promise that resolves to the response
 * containing the new access and refresh tokens.
 */
const refreshToken = async (request, response) => {
  const user = await auth.getAccessTokenUser(request);
  if (user && (await auth.isValidRefreshToken(request, user))) {
    const rolesAndPermissions = await auth.getUserRolesAndPermissions(user.id);
    const accessToken = auth.generateAccessToken(
      request.ip,
      { ...user, ...rolesAndPermissions },
    );
    const refresh = await auth.generateRefreshToken(user);
    auth.generateRefreshToken(user);
    response.status(200).json({
      status: 'success',
      data: { accessToken, refresh },
    });
  }
};

/**
 * Controller function for resetting a user's password.
 * @param {object} request.body - The request body.
 * @param {string} request.body.email - The user's email.
 * @param {object} response - The response object.
 * @returns {Promise} A promise that resolves to the response indicating
 * the success of the password reset email.
 * @throws {Error400} - Bad request error if the email is not valid.
 */
const resetPassword = async (request, response) => {
  const { email } = request.body;

  const user = await UserDataMapper.findOneByField('email', email);
  if (email !== user.email) {
    throw new Error400('Email not valid');
  }

  // Generate a password reset token
  const resetToken = jwt.sign({}, process.env.JWT_SECRET, {
    subject: user.id.toString(),
    expiresIn: '20m',
  });

  await sendReset(user.email, resetToken);

  response.status(200).json({
    status: 'success',
    message: 'Password reset email sent',
  });
};

module.exports = {
  logUser,
  refreshToken,
  resetPassword,
};

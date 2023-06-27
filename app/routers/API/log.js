const express = require('express');

const router = express.Router();
const controllerHandler = require('../../controllers/services/controllerHandler');
const jwtController = require('../../controllers/API/JwtController');

/**
 * @typedef {object} AuthResponse
 * @property {string} status - Success status message
 * @property {object} data - Data object containing access token and refresh token
 * @property {string} data.accessToken - Access token for the authenticated user
 * @property {string} data.refreshToken - Refresh token for the authenticated user
 */

/**
 * POST /api/log/in
 *
 * @summary Authenticate a user and initiate a session
 * @tags Authentication - Operations related to user authentication
 * @description
 * This route is used to authenticate a user.
 * It expects an user and a password in the body of the request.
 * If the credentials are valid, it initiates a session for the user and returns a 200 status code.
 * If the credentials are invalid, it returns a 401 status code.
 * @param {string} username.required.email - User's email
 * @param {string} password.required.password - User's password
 *
 * @return {AuthResponse} 200 - Successful authentication response
 *
 * @throws {Error} 403 - Invalid username or password
 * @throws {Error} 500 - Internal server error
 */
router.post('/in', controllerHandler(jwtController.logUser));

/**
 * POST /api/log/refresh-token
 *
 * @summary Refresh access token
 * @tags Authentication - Operations related to user authentication
 * @description
 * This route is used to refresh the access token for an authenticated user.
 * It expects a refresh token in the body of the request.
 * If the refresh token is valid, it generates a new access token and returns a 200 status code.
 * If the refresh token is invalid, it returns a 401 status code.
 *
 * @param {object} request.body - Refresh token payload
 * @param {string} request.body.required.refreshToken - Refresh token for the authenticated user
 *
 * @return {AuthResponse} 200 - Successful token refresh response
 *
 * @throws {Error} 401 - Invalid refresh token
 * @throws {Error} 500 - Internal server error
 */
router.post('/refresh-token', controllerHandler(jwtController.refreshToken));

/**
 * POST /api/log/reset-password
 *
 * @summary Send password reset email
 * @tags Authentication - Operations related to user authentication
 * @description
 * This route is used to send a password reset email to a user.
 * It expects the user's email in the body of the request.
 * If the email is associated with a user account,
 * it sends a password reset email and returns a 200 status code.
 * If the email is not found in the system, it returns a 404 status code.
 *
 * @param {string} email.required.email - User's email
 *
 * @return {AuthResponse} 200 - Successful password reset email response
 *
 * @throws {Error} 404 - User email not found
 * @throws {Error} 500 - Internal server error
 */
router.post('/reset-password', controllerHandler(jwtController.resetPassword));

module.exports = router;

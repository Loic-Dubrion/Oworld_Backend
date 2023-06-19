const express = require('express');

const router = express.Router();

const controllerHandler = require('../../controllers/services/controllerHandler');

const jwtController = require('../../authentication/jwtController');

/**
 * POST /api/log/in
 *
 * @summary Authenticate a user and initiate a session
 * @tags Authentication - Operations related to user authentication
 * @description
 * This route is used to authenticate a user.
 * It expects an email and a password in the body of the request.
 * If the credentials are valid, it initiates a session for the user and returns a 200 status code.
 * If the credentials are invalid, it returns a 401 status code.
 *
 * @param {object} request.body - User info payload
 * @param {string} request.body.required.email - User's email
 * @param {string} request.body.required.password - User's password
 *
 * @return {object} 200 - Successful authentication response
 *
 * @throws {Error} 403 - Invalid email or password
 * @throws {Error} 500 - Internal server error
 */
router.post('/in', controllerHandler(jwtController.logUser));

router.post('/refresh-token', controllerHandler(jwtController.refreshToken));

router.post('/reset-password', controllerHandler(jwtController.resetPassword));

module.exports = router;

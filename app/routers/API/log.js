const express = require('express');
const axios = require('axios');

const router = express.Router();

const controllerHandler = require('../../controllers/services/controllerHandler');
const { sessionController } = require('../../controllers/API');
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
router.post('/in', controllerHandler(sessionController.login));

/** GET /api/logout
 *
 * @summary Logout a user and destroy the session
 * @tags Authentication
 * @description
 * This route is used to logout a user.
 * It destroys the session associated with the user and returns a 200 status code.
 * If the session is not valid or doesn't exist, it returns a 400 status code.
 * @return {Message} 200 - successful logout response
 * @return {BadRequestError} 400 - Invalid or non-existent session
 * @return {Error} 500 - internal server error
 */
router.get('/out', controllerHandler(sessionController.logout));

router.get('/test', async (req, res, next) => {
  const data = await axios.get('https://restcountries.com/v3.1/alpha/FRA');
  console.log(data.data);
  res.json(data.data);
});

module.exports = router;

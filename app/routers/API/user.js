const express = require('express');

const router = express.Router();

// Controllers
const controllerHandler = require('../../controllers/services/controllerHandler');
const { userController } = require('../../controllers/API');

// Import Middlewares
const validate = require('../../validations/validate');
const {
  createUserBody,
  updateUserBody,
  deleteUserBody,
} = require('../../validations/schemas');
const { checkUserId } = require('../../controllers/services/checkRBAC');
const { authorize } = require('../../controllers/services/jwtService');

router.use('/:userId', authorize);
router.use('/:userId', checkUserId);

/**
 * POST /api/user/
 *
 * @summary Create a new user in db
 * @tags User - operations related to users
 *
 * @param {string} user.username.required - Username - eg: JohnyBeGood
 * @param {string} user.email.required - Email - eg: johndoe@test.com -
 * regex: /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
 * @param {string} user.password.required - Password - eg: &Oworld2023 -
 * regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
 * @param {integer} user.country_origin.required - Country Origin - eg: 1
 * @param {string} user.birth_date.required - Birth Date - eg: 1938-06-16
 *
 * @return {object} 201 - success response
 * @return {Error} 500 - Internal server error
 *
 */
router.post(
  '/',
  validate(createUserBody, 'body'),
  controllerHandler(userController.addUser.bind(userController)),
);

/**
 * GET /api/user/{userId}/
 *
 * @summary Get profil and favorite countries for a user
 * @tags User
 *
 * @param {integer} userId.path.required - The ID of the user
 *
 * @return {object} 200 - success response - object representing the user's favorite countries
 * @property {string} username - The username of the user
 * @property {string} origin_country - The user's country of origin
 * @property {array<string>} favorite_countries - The user's favorite countries
 * @property {number} favorite_country_percentage -
 * The percentage of countries that are favorited by the user
 * @return {Error} 500 - Internal server error
 *
 */
router.get(
  '/:userId',
  controllerHandler(userController.getFavoriteCountries.bind(userController)),
);

/**
* POST /api/user/{userId}/{usercountryISO}
*
* @summary Post - add a new favourite
* @tags User
*
* @param {integer} userId.path.required - The ID of the user
* @param {string} countryIso3.path.required - The country Iso3
*
* @return {object} 201 - success response
* @return {Error} 500 - Internal server error
*
*/
router.post(
  '/:userId/:countryISO/',
  controllerHandler(userController.addFavorite.bind(userController)),
);

/**
* DELETE /api/user/{userId}/{userCountry}
*
* @summary Delete - add a new favourite
* @tags User
*
* @param {integer} userId.path.required - The ID of the user
* @param {string} countryIso3.path.required - The country Iso3
*
* @return {object} 200 - success response
* @return {Error} 500 - Internal server error
*
*/
router.delete(
  '/:userId/:countryISO/',
  controllerHandler(userController.deleteFavorite.bind(userController)),
);

/**
 * PUT /api/user/{userId}
 *
 * @summary Update a user
 * @tags User
 *
 * @param {integer} userId.path.required - The ID of the user
 * @param {object} request.body.required - User info payload
 * @param {string} request.body.username - User's username
 * @param {string} request.body.email - User's email
 * @param {string} request.body.password - User's password
 *
 * @return {object} 200 - Success response
 * @return {Error} 500 - Internal server error
 */
router.put(
  '/:userId',
  validate(updateUserBody, 'body'),
  controllerHandler(userController.updateUser.bind(userController)),
);

/**
 * DELETE /api/user/{userId}
 *
 * @summary Delete a user
 * @tags User
 *
 * @param {integer} userId.path.required - The ID of the user
 * @param {object} request.body.required - The password of the user

 *
 * @return {object} 200 - Success response
 * @return {Error} 500 - Internal server error
 */
router.delete(
  '/:userId',
  validate(deleteUserBody, 'body'),
  controllerHandler(userController.deleteUser.bind(userController)),
);

module.exports = router;

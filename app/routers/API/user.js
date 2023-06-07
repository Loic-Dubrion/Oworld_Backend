const express = require('express');

const router = express.Router();

const controllerHandler = require('../../controllers/services/controllerHandler');
const { userController } = require('../../controllers/API');

const validate = require('../../validations/validate');
const { createUserBody } = require('../../validations/schemas');

/**
 * POST /api/user/
 *
 * @summary Create a new user in db
 * @tags User - operations related to users
 *
 * @param {object} user.required - User details
 * @property {string} user.username - Username - eg: JohnyBeGood
 * @property {string} user.email - Email - eg: johndoe@example.com -
 * regex: /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
 * @property {string} user.password - Password - eg: &Oworld2023 -
 * regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
 * @property {integer} user.country_origin - Country Origin - eg: 1
 * @property {string} user.birth_date - Birth Date - eg: 1938-06-16
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
* POST /api/user/{userId}/{userCountry}
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

router.put(
  '/:userID',
);
// - Modifier le profil

router.delete(
  '/:userID',
);

router.delete(
  '/:userID/:countryID/',
);
// - supp d'un favoris

module.exports = router;

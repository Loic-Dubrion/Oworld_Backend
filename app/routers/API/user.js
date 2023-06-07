const express = require('express');

const router = express.Router();

const controllerHandler = require('../../controllers/services/controllerHandler');
const { userController } = require('../../controllers/API');

/**
 * GET /api/user/{userId}/
 *
 * @summary Get profil and favorite countries for a user
 * @tags Users - operations related to users
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
* @tags Users -
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
* @tags Users -
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
// - Modifier les pays pin

router.delete(
  '/:userID',
);

router.delete(
  '/:userID/:countryID/',
);
// - supp d'un favoris

module.exports = router;

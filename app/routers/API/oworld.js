const express = require('express');

const controllerHandler = require('../../controllers/services/controllerHandler');
const externalApiController = require('../../controllers/API/externalApiController');

const router = express.Router();

/**
 * GET /api/oworld
 *
 * @summary Get statistics
 * @tags Oworld
 *
 * @return {array<object>} 200 - Success response
 * - An array of objects earth details
 * @return {Error} 500 - Internal server error
 *
 */
router.get(
  '/',
  controllerHandler(externalApiController.testRestCountry),
);

/**
 * GET /api/oworld/{countryIso3}
 *
 * @summary Get data
 * @tags Oworld - data world, country, categories
 * @return {array<object>} 200 - Success response
 * - An array of objects where each object represents the statistics for a particular country
 * @return {Error} 500 - Internal server error
 *
 */
router.get(
  '/:countryIso3',
  controllerHandler(externalApiController.restCountry),
);

/**
 * GET /api/oworld/{countryIso3}/category
 *
 * @summary Get country data by category
 * @tags Oworld
 *
 * @param {string} countryIso3.path.required - The ISO3 code of the country
 * @return {object} 200 - Success response - An object containing country data by category
 * @return {Error} 500 - Internal server error
 */
router.get(
  '/:countryIso3/category',
  controllerHandler(externalApiController.worldBank),
);

module.exports = router;
const express = require('express');

const controllerHandler = require('../../controllers/services/controllerHandler');
const testController = require('../../controllers/API/externalApiController');

const router = express.Router();

/**
 * GET /api/oworld/{countryIso3}
 *
 * @summary Get statistics
 * @tags Admin - management administration
 *
 * @param {string} countryIso3.path.required - The ISO3 code of the country
 *
 * @return {array<object>} 200 - Success response
 * - An array of objects where each object represents the statistics for a particular country
 * @return {Error} 500 - Internal server error
 *
 */
router.get(
  '/:countryIso3',
  controllerHandler(testController.testRestCountry),
);

/**
 * GET /api/oworld/{countryIso3}/category
 *
 * @summary Get country data by category
 * @tags Admin - management administration
 *
 * @param {string} countryIso3.path.required - The ISO3 code of the country
 * @return {object} 200 - Success response - An object containing country data by category
 * @return {Error} 500 - Internal server error
 */
router.get(
  '/:countryIso3/category',
  controllerHandler(testController.testWB),
);

module.exports = router;

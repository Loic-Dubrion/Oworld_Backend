const express = require('express');

const controllerHandler = require('../../controllers/services/controllerHandler');
const externalApiController = require('../../controllers/API/externalApiController');
const oworldController = require('../../controllers/API/OworldController');

const router = express.Router();

/**
 * GET /api/oworld
 *
 * @summary Get data World
 * @tags Oworld
 *
 * @return {array<object>} 200 - Success response
 * - An array of objects earth details
 * @return {Error} 500 - Internal server error
 *
 */
router.get(
  '/',
  controllerHandler(oworldController.getAll.bind(oworldController)),
);

/**
 * GET /api/oworld/list
 *
 * @summary Get a list of all countries
 * @tags Oworld
 *
 * @param {boolean} useView.query.required -
 * Whether to use a SQL view or not.
 * - ?useView=true -
 * This parameter is required.
 *
 * @return {array<object>} 200 - Success response
 * - A list of all countries
 * @return {Error} 500 - Internal server error
 *
 * @example Get statistics using a SQL view
 *   GET /api/oworld/list?useView=true
 */
router.get(
  '/list',
  controllerHandler(oworldController.getAll.bind(oworldController)),
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

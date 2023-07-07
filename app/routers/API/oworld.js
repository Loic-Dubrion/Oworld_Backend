const express = require('express');

// Controllers
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
 * @description
 * This route returns all the information about planet Earth and the other planets.
 * applies false to useView.
 * Test me!
 * @param {boolean} useView.query.required -
 * Whether to use a SQL view or not.
 * if true = dataworld, else = country list
 * - ?useView=false -
 * This parameter is required.
 * @return {array<object>} 200 - Success response
 * - An array of objects earth details
 * @return {Error} 500 - Internal server error
 *
 */
router.get(
  '/',
  controllerHandler(oworldController.getPlanet.bind(oworldController)),
);

/**
 * GET /api/oworld/flags
 *
 * @summary Get all flags
 * @tags Oworld
 *
 * @description
 * This route returns a list of the world's flags.
 * Test me!
 *
 * @return {array<object>} 200 - Success response
 * - a list of the world's flags
 * @return {Error} 500 - Internal server error
 *
 */
router.get(
  '/flags',
  controllerHandler(externalApiController.restCountryFlags),
);

/**
 * GET /api/oworld/list
 *
 * @summary Get a list of all countries or dataWorld
 * @tags Oworld
 *
 * @description
 * This route returns a list of all countries with their iso codes.
 * applies true to useView.
 * Test me!
 *
 * @param {boolean} useView.query.required -
 * Whether to use a SQL view or not.
 * if true = dataworld, else = country list
 * - ?useView=true -
 * This parameter is required.
 *
 * @return {array<object>} 200 - Success response
 * - A list of all countries
 * @return {Error} 500 - Internal server error
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
 *
 * @description
 * represents the statistics for a particular country
 * Test me!
 *
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
 * @description
 * Returns details by category for each country using World Bank data.
 * Test me !
 *
 * @param {string} countryIso3.path.required - The ISO3 code of the country
 * @return {object} 200 - Success response - An object containing country data by category
 * @return {Error} 500 - Internal server error
 */
router.get(
  '/:countryIso3/category',
  controllerHandler(externalApiController.worldBank),
);

/**
 * GET /api/oworld/{countryIso3}/wtf
 *
 * @summary Get a radio from the country
 * @tags Oworld
 *
 * @description
 * Return a local radio station, an anecdote and a list of celebrities.
 * Test me !
 *
 * @param {string} countryIso3.path.required - The ISO3 code of the country
 * @return {object} 200 - Success response - An object containing a radio
 * @return {Error} 500 - Internal server error
 */
router.get(
  '/:countryIso3/wtf',
  controllerHandler(externalApiController.wtf),
);

/**
 * GET /api/oworld/{countryIso3}/unsplash
 *
 * @summary Get five urls 5 urls of images of the country
 * @tags Oworld
 *
 * @description
 * Return five urls 5 urls of images of the country with author, description and alt.
 * Test me !
 *
 * @param {string} countryIso3.path.required - The ISO3 code of the country
 * @return {object} 200 - Success response - An object containing 5 image urls and their info
 * @return {Error} 500 - Internal server error
 */
router.get(
  '/:countryIso3/unsplash',
  controllerHandler(externalApiController.unsplash),
);

module.exports = router;

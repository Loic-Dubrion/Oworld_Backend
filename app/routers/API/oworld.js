const express = require('express');
const axios = require('axios');

// Controllers
const controllerHandler = require('../../controllers/services/controllerHandler');
const externalApiController = require('../../controllers/API/externalApiController');
const oworldController = require('../../controllers/API/OworldController');

const router = express.Router();

// Routes
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
 * GET /api/oworld/flags
 *
 * @summary Get all flags
 * @tags Oworld
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
 * @return {array<object>} 200 - Success response
 * - An array of objects where each object represents the statistics for a particular country
 * @return {Error} 500 - Internal server error
 *
 */
// router.get(
//   '/:countryIso3',
//   controllerHandler(externalApiController.restCountry),
// );
router.get('/:country', async (req, res, next) => {
  const country = req.params;
  const data = await axios.get('https://restcountries.com/v3.1/alpha/FRA');
  console.log(data.data, country);
  res.json(data.data);
});

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

/**
 * GET /api/oworld/{countryIso3}/wtf
 *
 * @summary Get a radio from the country
 * @tags Oworld
 *
 * @param {string} countryIso3.path.required - The ISO3 code of the country
 * @return {object} 200 - Success response - An object containing a radio
 * @return {Error} 500 - Internal server error
 */
router.get(
  '/:countryIso3/wtf',
  controllerHandler(externalApiController.radio),
);

module.exports = router;

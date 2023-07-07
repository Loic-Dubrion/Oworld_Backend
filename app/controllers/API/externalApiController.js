const countryApi = require('../../models/external_API/restCountryAPI');
const fetchWorldBankData = require('../../models/external_API/worldBankApi');
const fetchWTF = require('../../models/external_API/wtfAPI');
const fetchUnsplash = require('../../models/external_API/unplashAPI');
const client = require('../../services/clientDB/clientPostgres');

/**
 * Controller for external API endpoints.
 */
const externalApiController = {
  /**
   * Fetches data for a specific country from the RestCountry API.
   *
   * @param {Object} request - url parameter accept : Code Iso3.
   * @param {Object} response - Global data for all countries.
   */
  restCountry: async (request, response) => {
    const result = await countryApi.fetchCountryData(request.params.countryIso3);
    response.json(result);
  },

  /**
   * Fetches data for all countries from the RestCountry API.
   *
   * @param {Object} request - The request object.
   * @param {Object} response - The response object.
   */
  restCountryFlags: async (request, response) => {
    const result = await countryApi.fetchAllCountries();
    response.json(result);
  },

  /**
   * Fetches data for a specific country from the World Bank API.
   *
   * @param {Object} request - The request object.
   * @param {Object} response - The response object.
   */
  worldBank: async (request, response) => {
    const result = await fetchWorldBankData(request.params.countryIso3);
    response.json(result);
  },

  /**
   * Fetches a radio for a specific country from the radioBrowser API.
   *
   * @param {Object} request - The request object.
   * @param {Object} response - The response object.
   */
  wtf: async (request, response) => {
    const result = await fetchWTF(request.params.countryIso3);
    response.json(result);
  },

  /**
   * Fetches Unsplash pictures for a specific country from the Unsplash API.
   *
   * @param {Object} request - The request object.
   * @param {Object} response - The response object.
   */
  unsplash: async (request, response) => {
    const { countryIso3 } = request.params;
    console.log(countryIso3);
    const queryCountry = {
      text: 'SELECT name FROM country WHERE iso3 = $1',
      values: [countryIso3],
    };
    let nameCountry = await client.query(queryCountry);
    nameCountry = nameCountry.rows[0].name;
    console.log(nameCountry);
    const result = await fetchUnsplash(nameCountry);
    response.json(result);
  },
};

module.exports = externalApiController;

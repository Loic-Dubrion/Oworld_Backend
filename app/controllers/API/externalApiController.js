// Models
const countryApi = require('../../models/external_API/restCountryAPI');
const fetchWorldBankData = require('../../models/external_API/worldBankApi');
const fetchWTF = require('../../models/external_API/wtfAPI');

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
    console.log('result => ', result);
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
    const wtf = await fetchWTF(request.params.countryIso3);
    response.json(wtf);
  },
};

module.exports = externalApiController;

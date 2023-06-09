// Models
const countryApi = require('../../models/external_API/restCountryAPI');
const fetchWorldBankData = require('../../models/external_API/worldBankApi');

// Controllers
const externalApiController = {
  restCountry: async (request, response) => {
    const result = await countryApi.fetchCountryData(request.params.countryIso3);
    response.json(result);
  },

  restCountryFlags: async (request, response) => {
    const result = await countryApi.fetchAllCountries();
    response.json(result);
  },

  worldBank: async (request, response) => {
    const result = await fetchWorldBankData(request.params.countryIso3);
    response.json(result);
  },
};

module.exports = externalApiController;

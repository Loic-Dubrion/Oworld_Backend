const logger = require('../../services/logger');

const fetchCountryData = require('../../models/external_API/restCountryAPI');
const fetchWorldBankData = require('../../models/external_API/worldBankApi');

const externalApiController = {
  testRestCountry: async (request, response) => {
    logger.info(request.params.countryIso3);
    const result = await fetchCountryData(request.params.countryIso3);
    response.json(result);
  },

  testWB: async (request, response) => {
    logger.info(request.params.countryIso3);
    const result = await fetchWorldBankData(request.params.countryIso3);
    response.json(result);
  },
};

module.exports = externalApiController;

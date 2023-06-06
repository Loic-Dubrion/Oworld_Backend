const fetchCountryData = require('../../models/restCountryAPI');
const fetchAndLogData = require('../../models/worldBankApi');

const testController = {
  testRestCountry: async (request, response) => {
    console.log(request.params.countryIso3);
    const result = await fetchCountryData(request.params.countryIso3);
    response.json(result);
  },

  testWB: async (request, response) => {
    console.log(request.params.countryIso3);
    const result = await fetchAndLogData(request.params.countryIso3);
    response.json(result);
  },
};

module.exports = testController;

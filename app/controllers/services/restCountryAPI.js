const logger = require('../../services/logger');

async function fetchCountryData(isoCode) {
  const baseUrl = 'https://restcountries.com/v3.1/';

  const param = {
    service: 'alpha',
    value: isoCode,
    fields: [
      'name',
      'currencies',
      'capital',
      'subregion',
      'region',
      'languages',
      'flags',
      'coatOfArms',
      'area',
      'maps',
      'population',
      'car',
      'timezone',
      'continent',
    ],
  };

  const url = `${baseUrl}/${param.service}/${param.value}?fields=${param.fields}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    logger.info(data);
  } catch (error) {
    logger.error(error);
  }
}

module.exports = fetchCountryData;

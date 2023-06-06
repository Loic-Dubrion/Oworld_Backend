const logger = require('../services/logger');

/**
 * Fetch country data for a specific country using the restcountries API.
 * 
 * The function makes a call to the restcountries API and returns an object containing
 * various properties about the country like name, currencies, capital, subregion, region, 
 * languages, flags, coatOfArms, area, maps, population, car, timezone and continent.
 *
 * @param {string} isoCode - The ISO code for the country of interest.
 * @returns {Promise<Object|null>} A Promise that resolves to an object containing country data, or null if an error occurs.
 * 
 * @throws Will throw an error if the restcountries API call fails.
 */
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
    return data;
  } catch (error) {
    // Log any errors that occur during the restcountries API call
    logger.error(error);
    return null;
  }
}

module.exports = fetchCountryData;

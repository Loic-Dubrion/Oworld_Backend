/**
 * Performs a query to retrieve data for a country using an ISO code.
 * @param {string} isoCode ex: FRA
 * @returns {Promise<Object|null>} Country data or null in case of error.
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
    return data;
  } catch (error) {
    return null;
  }
}

module.exports = fetchCountryData;

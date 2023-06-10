/* eslint-disable camelcase */
// eslint-disable-next-line import/no-extraneous-dependencies
const memoize = require('memoizee');

const RadioBrowser = require('radio-browser');
const client = require('../../services/clientdb');

/**
 * Fetch radio station data for a specific country using the RadioBrowser API.
 *
 * The function makes a call to the RadioBrowser API and returns an object containing
 * the name, url, url_resolved, and homepage of the radio station.
 *
 * @param {string} isoCode - The ISO code for the country of interest.
 * @returns {Promise<Object>} A Promise that resolves to an object containing radio station data.
 *
 * @throws Will throw an error if the RadioBrowser API call fails.
 */
async function fetchRadioData(isoCode) {
  const filter = {
    limit: 1,
    by: 'country',
    searchterm: isoCode,
  };

  try {
    const result = {};

    // Call RadioBrowser API and get radio station data
    const [radioData] = await RadioBrowser.getStations(filter);

    if (radioData) {
      result.radio = {
        name: radioData.name,
        url: radioData.url,
        url_resolved: radioData.url_resolved,
        homepage: radioData.homepage,
      };
    }

    // Retrieve "insolite" from the database
    const queryResult = await client.query('SELECT insolite FROM country WHERE iso3 = $1', [isoCode]);
    if (queryResult.rows.length > 0) {
      result.insolite = queryResult.rows[0].insolite;
    }

    return result;
  } catch (error) {
    return null;
  }
}

const memoizedFetchRadioData = memoize(
  fetchRadioData,
  { promise: true, maxAge: 60 * 60 * 1000 },
);

// Exporter les fonctions mémoïsées plutôt que les originales
module.exports = {
  fetchRadioData: memoizedFetchRadioData,
};
module.exports = fetchRadioData;
